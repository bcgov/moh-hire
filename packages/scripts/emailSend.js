require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const fs = require('fs');
const outputCSV = require('./generatecsv').default.generateEmailCSV;
// Environment variables
const { CHES_HOST, CHES_AUTH_URL, CHES_CLIENT_SECRET, CHES_CLIENT_ID } = process.env;

// Five requests per second
const targetRate = 5;

const config = {
  headers: {
    authorization: null,
    'Content-Type': 'application/json',
  },
};

async function authenticateChes() {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: CHES_CLIENT_ID,
      password: CHES_CLIENT_SECRET,
    }, // service client ID and secret
  };
  try {
    const response = await axios.post(CHES_AUTH_URL, params, config);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
    return error;
  }
}
async function updateToken() {
  return `Bearer ${await authenticateChes()}`;
}

function createPayload(recipient) {
  return {
    from: 'noreply@gov.bc.ca',
    to: [recipient],
    subject: 'Email Subject here',
    bodyType: 'text',
    body: `HELLO WORLD`,
  };
}
// TODO : Parse real email list
async function getEmails() {
  await new Promise(resolve => {
    setTimeout(resolve(), 1000);
  });
  const file = fs.readFileSync('./emails.csv').toString();

  // Split the string into rows, discard the columns row
  return file
    .split('\n')
    .slice(1)
    .map(rowString => {
      // Split each row into it's variables
      let row = rowString.split(',');
      return {
        row: row[0],
        uuid: row[1],
        email: row[2],
      };
    });
}

async function sendEmail(email, uuid, delay) {
  await Promise.all([
    //axios.post(`${CHES_HOST}/api/v1/email`, createPayload(email), config),
    new Promise((resolve, reject) => {
      // 5% will fail mocked out.
      if (Math.random() * 100 < 5) {
        reject();
      }
      // Mock delay in send
      setTimeout(resolve, delay);
    }),
  ]);
}

function printProgress(progress) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
}

async function sendEmails() {
  const emails = await getEmails();
  const start = new Date();
  let completed = 0;
  let errors = [];
  config.headers.authorization = await updateToken();

  // Set up interval function to run multiple sends at a set rate.
  const interval = setInterval(() => {
    if (emails.length) {
      const now = new Date();
      const duration = (now - start) / 1000;
      const currentRate = completed / duration;
      printProgress(`Current ${currentRate.toPrecision(3)}`);
      // Only send email if we are under the targeted rate
      if (currentRate <= targetRate) {
        new Promise(async resolve => {
          const current = emails.pop();
          try {
            await sendEmail(current.email, current.uuid, Math.random() * 100);
          } catch (e) {
            console.log(`\nError! ${errors.length} \/  ${completed} \n `);
            if (e?.response?.data === 'Access denied') {
              try {
                config.headers.authorization = await updateToken();
                await sendEmail(emails.email, emails.uuid, Math.random() * 100);
              } catch (e2) {
                errors.push(current);
              }
            } else {
              errors.push(current);
            }
          }
          completed++;
          resolve();
        });
      }
    } else {
      // When the email queue is empty, clear the interval and store failed sends in a csv
      clearInterval(interval);
      console.log(`There were ${errors.length} errors`);
      outputCSV(errors, './errors.csv');
    }
  }, 10);
}

async function main() {
  console.log(CHES_HOST, CHES_AUTH_URL, CHES_CLIENT_SECRET, CHES_CLIENT_ID);
  await sendEmails();
}

main();
