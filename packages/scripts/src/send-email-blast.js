import fs from 'fs';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import aws from 'aws-sdk';
import { PromisePool } from '@supercharge/promise-pool';

import { subjectOne, templateOne } from './constants.js';
dotenv.config({ path: '../../.env' });

const MAX_RETRY = 5;
let errors = [];
let sent = 0;

// authenticate aws ses
const credentials = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});
aws.config.credentials = credentials;
aws.config.region = process.env.AWS_S3_REGION;

const ses = new aws.SES();

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
  const file = readFileSync('./in/emails.csv').toString();
  // Split the string into rows, discard the columns row
  const emailObjs = file
    .split('\n')
    .slice(1)
    .map(rowString => {
      // Split each row into it's variables
      let row = rowString.split(',');
      return {
        name: row[0].trim(),
        email: row[1].trim(),
        confirmation_id: row[2].trim(),
      };
    });

  const emails = findDuplicates(emailObjs);
  return emails;
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

// send individual emails using AWS SES
async function sendEmail(user, retryCount = 0) {
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
  };

  try {
    console.log(`Trying to Send Email to ${email}`);

    const mail = await ses.sendEmail(params).promise();
    sent++;
    console.log(`\x1b[32mSuccess\x1b[0m: Email sent to ${email}`);
    return mail;
  } catch (e) {
    // set max retry count for failed emails, each email should have 5 attempts
    if (MAX_RETRY > retryCount) {
      console.log(
        `\x1b[31mError\x1b[0m: Will try sending to ${user.email} ${
          MAX_RETRY - retryCount
        } more time(s)`,
      );
      retryCount++;
      await sendEmail(user, retryCount);
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

  if (emails.length > 0) {
    // Set up promise pool to allow 10 emails to be processed concurrently at one time
    await PromisePool.for(emails)
      .withConcurrency(10)
      .process(async e => {
        await sendEmail(e);
      });

    console.log(`\x1b[32mCompleted Count\x1b[0m: ${sent}`);
    console.log(`\x1b[31mFailed Count\x1b[0m: ${errors.length}`);
    if (errors.length > 0) {
      generateEmailCSV(errors, './out/errors.csv');
    }
  }
}

async function main() {
  await sendEmails(9000);
}

main();
