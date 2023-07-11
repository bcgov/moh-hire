import fs from 'fs';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import aws from 'aws-sdk';
import * as handlebars from 'handlebars';

import { subjectOne, templateOne } from './constants.js';
dotenv.config({ path: '../../.env' });

const MAX_RETRY = 5;
let retryCount = 0;
let errors = [];
let sent = 0;

const credentials = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});
aws.config.credentials = credentials;
aws.config.region = process.env.AWS_S3_REGION;

// authenticate aws ses
const ses = new aws.SES();

// Five requests per second
const targetRate = 10;

// genereates csv file for any email NOT sent
function generateEmailCSV(array, outputFilePath) {
  let fulltext = 'name,email\n';
  array.map(row => {
    fulltext += `${row.name},${row.email}\n`;
  });
  fs.writeFileSync(outputFilePath, fulltext);
}

// get emails from csv file
async function getEmails() {
  // await new Promise(resolve => {
  //   setTimeout(resolve(), 1000);
  // });
  const file = readFileSync('./in/emails.csv').toString();
  // Split the string into rows, discard the columns row
  return file
    .split('\n')
    .slice(1)
    .map((rowString, index) => {
      // Split each row into it's variables
      let row = rowString.split(',');
      return {
        name: row[0].trim(),
        email: row[1].trim(),
        confirmation_id: row[2].trim(),
      };
    });
}

function printProgress(progress) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
}

// remove duplicate email entries
function findDuplicates(emails) {
  let unique = [];
  let result = [];
  emails.forEach(email => {
    if (!unique.includes(email.email)) {
      unique.push(email.email);
      result.push(email);
    } else {
      console.log('Duplicate found', JSON.stringify(email));
    }
  });
  return result;
}

// get handlebar template
// function getTemplate() {
//   const templatePath = path.resolve(`${__dirname}/templates/email-blast-template.hbs`);

//   const templateContent = fs.readFileSync(templatePath, 'utf-8');
//   const template = handlebars.compile(templateContent, { strict: true });
//   const body = template(mailable.context);
//   return body;
// }

// send individual emails using AWS SES
async function sendEmail(user) {
  const { name, email, confirmation_id } = user;
  // unsure of actual template body, using hardcoded html string for now
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: [email],
    subject: subjectOne,
    body: templateOne,
  };

  if (!ses) return;

  const params = {
    Destination: {
      ToAddresses: [...mailOptions.to],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: mailOptions.body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: mailOptions.subject,
      },
    },
    //TO-DO: testing purposes, need to remove and replace with prod
    Source: 'EHPRDoNotReply@dev.ehpr.freshworks.club',
    // Source: process.env.MAIL_FROM || 'EHPRDoNotReply@dev.ehpr.freshworks.club',
  };

  try {
    console.log('Trying to Send Email');
    const mail = await ses.sendEmail(params).promise();
    sent++;
    return mail;
  } catch (e) {
    // set max retry count for failed emails
    if (MAX_RETRY > retryCount) {
      console.log(`Will try sending to ${user.email} ${MAX_RETRY - retryCount} more time(s)`);
      retryCount++;
      await sendEmail(user);
    } else {
      errors.push(user);
      console.error(e.message);
    }
  }
}

// function to setup and send emails
async function sendEmails(max) {
  let emails = await getEmails();
  console.log(`Sending ${emails.length} emails has begun...`);

  // guard to limit emails and remove ones over max limit
  // outputs to csv file
  if (emails.length > max) {
    generateEmailCSV(emails.slice(max), `out/unsent_emails${Date.now()}.csv`);
    emails = emails.slice(0, max);
  }

  emails = findDuplicates(emails);
  let start = new Date();

  // Set up interval function to run multiple sends at a set rate.
  const interval = setInterval(() => {
    if (emails.length) {
      const now = new Date();
      const duration = (now - start) / 1000;
      const currentRate = sent / duration;
      printProgress(
        `Current ${currentRate.toPrecision(3)}  Errors: ${errors.length} Completed: ${sent}`,
      );
      // Only send email if we are under the targeted rate
      if (currentRate <= targetRate) {
        new Promise(async resolve => {
          const current = emails.pop();
          await sendEmail(current);
          resolve();
        });
      }
    } else {
      // When the email queue is empty, clear the interval and store failed sends in a csv
      clearInterval(interval);
      console.log(`\x1b[32mCompleted Count\x1b[0m: ${sent}`);
      console.log(`\x1b[31mFailed Count\x1b[0m: ${errors.length}`);
      if (errors.length > 0) {
        generateEmailCSV(errors, './out/errors.csv');
      }
    }
  }, 10);
}

async function main() {
  await sendEmails(9000);
}

main();
