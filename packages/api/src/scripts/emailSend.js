require('dotenv').config({ path: '.env' });
const axios = require('axios');
const e = require('cors');
const faker = require('faker');
// Environment variables
const { CHES_HOST, CHES_AUTH_URL, CHES_CLIENT_SECRET, CHES_CLIENT_ID } =
  process.env;
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

let sentCount = 0;
// Five requests per second
const targetRate = 5;

async function getEmails(count) {
  await new Promise((resolve) => {
    setTimeout(resolve(), 1000);
  });
  const arr = [];
  for (var i = 0; i < count; i++) arr.push(faker.internet.email());
  return arr;
}

async function sendEmail(email, delay) {
  // const config = {
  //   headers: {
  //     authorization: await updateToken(),
  //     'Content-Type': 'application/json',
  //   },
  // };
  await Promise.all([
    //axios.post(`${CHES_HOST}/api/v1/email`, createPayload(email), config),

    new Promise((resolve) => {
      //console.log(`Sending ${email}`);
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
  const emails = await getEmails(100);
  const start = new Date();
  let completed = 0;
  const interval = setInterval(() => {
    if (emails.length) {
      const now = new Date();
      const duration = (now - start) / 1000;

      const currentRate = completed / duration;
      printProgress(`Current ${currentRate}`);
      if (currentRate <= targetRate) {
        new Promise(async (resolve) => {
          await sendEmail(emails.pop(), Math.random() * 100);
          completed++;
          resolve();
        });
      }
    } else {
      clearInterval(interval);
    }
  }, 100);
}

async function main() {
  await sendEmails();
}

main();
