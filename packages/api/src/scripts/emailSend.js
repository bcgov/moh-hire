require('dotenv').config({ path: '.env' });
const axios = require('axios');
const e = require('cors');
const faker = require('faker');
const fs = require('fs');
const outputCSV = require('./generatecsv').default.generateEmailCSV;
// Environment variables
const { CHES_HOST, CHES_AUTH_URL, CHES_CLIENT_SECRET, CHES_CLIENT_ID } =
  process.env;

let sentCount = 0;
// Five requests per second
const targetRate = 50;

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

async function getEmails(count) {
  await new Promise((resolve) => {
    setTimeout(resolve(), 1000);
  });
  const file = fs.readFileSync('./src/scripts/emails.csv').toString();
  //for (var i = 0; i < count; i++) arr.push(faker.internet.email());
  // Split the string into rows, discard the columns row
  return file
    .split('\n')
    .slice(1)
    .map((rowString) => {
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
      //console.log(`Sending ${email}`);

      // 5% will fail
      if (Math.random() * 100 < 5) {
        reject();
      }
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
  const interval = setInterval(() => {
    if (emails.length) {
      const now = new Date();
      const duration = (now - start) / 1000;
      const currentRate = completed / duration;
      printProgress(`Current ${currentRate.toPrecision(3)}`);
      if (currentRate <= targetRate) {
        new Promise(async (resolve) => {
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
      clearInterval(interval);
      console.log(`There were ${errors.length} errors`);
      outputCSV(errors, 'src/scripts/errors.csv');
    }
  }, 10);
}

async function main() {
  await sendEmails();
}

main();
