require('dotenv').config({ path: '.env' });
const axios = require('axios');

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

async function sendEmail(email) {
  const config = {
    headers: {
      authorization: await updateToken(),
      'Content-Type': 'application/json',
    },
  };
  await Promise.all([
    axios.post(`${CHES_HOST}/api/v1/email`, createPayload(email), config),
  ]);
}
async function main() {
  await sendEmail('dbayly@freshworks.io');
}

main();
