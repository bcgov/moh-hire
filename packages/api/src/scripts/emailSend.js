require('dotenv').config({ path: '.env' });
const axios = require('axios');
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
async function getEmail() {
  if (sentCount <= 100) {
    sentCount++;
  } else {
    return false;
  }
  await new Promise((resolve) => {
    setTimeout(resolve(), 1000);
  });
  return faker.internet.email();
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
      console.log(`Sending ${email}`);
      setTimeout(resolve, delay);
    }),
  ]);
}
async function sendEmailsRecursive() {
  const email = await getEmail();
  if (email) {
    await sendEmail(email, 1000);
    await sendEmailsRecursive();
  } else {
    console.log('all done');
    return;
  }
}

async function main() {
  await sendEmailsRecursive();
}

main();
