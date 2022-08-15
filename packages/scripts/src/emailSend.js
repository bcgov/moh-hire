import fs from 'fs';
import dotenv from 'dotenv';
import axios from 'axios';
import { readFileSync } from 'fs';
import { v4 as uuidV4 } from 'uuid';
//import { subjectTwo, templateOne, templateTwo } from './constants';
dotenv.config({ path: '../../.env' });

export const templateOne = `
<body>
    <p>
      You are receiving this email because you have registered on British Columbia's Emergency
      <br />
      Health Provider Registry (EHPR). Thank you very much for your willingness and interest in
      <br />
      supporting BC's health system.
    </p>
  
    <p>
      Since its launch, the program has adapted to respond to an increase in demand as a result of
      <br />
      climate change (e.g., wildfires, floods), as well as a global pandemic. More than 10,000 
      <br/> 
      people are currently registered with the EHPR and the Ministry of Health is undertaking a 
      <br/>
      refresh of the system to update registrant information and improve our capacity to contact
      <br/>
      and deploy registrants in a timely way.
    </p>
    

    <p>
      <b>
        <i>
        If you are still interested in being an active registrant with the EHPR and want to be 
        <br/>
        considered for current and future emergency deployments,
         <a href="https://ehpr.gov.bc.ca/submission/1">
          please click this link to register
          <br/>
          with the new system.
        </a> If you do not complete the new form, you will be removed from the
        <br/>
        EHPR and will no longer be considered when opportunities arise.
        </b>
      </p>At this time, health authorities are interested in contacting registrants to support the <br/>
       following service areas:
    </p>
    <ul>
      <li>Hospital settings including: critical care, intensive care, emergency departments and support staff</li>
      <li>Long-term care and/or Assisted living</li>
      <li>Long-term care</li>
      <li>Home support</li>
      <li>COVID-19 specific support (such as immunization and testing)</li>
    </ul>
    <p>
    Supports may be available to registrants willing to deploy and there may be opportunities for
    <br/>
    recently retired registrants (those with Temporary Emergency Registration).If you chose to
    <br/>
    re-affirm your registration, thank you for your continued interest in the EHRP. If you do not, 
    <br/>
    thank you for your initial registration. We could not do this work without the commitment and 
    <br/>
    support of dedicated professionals like yourself. 
    <br/>
    <br/>
    If you have any questions, please email EHPRQuestions@gov.bc.ca.    
    </p>
    <br />
    Sincerely,
    <br />
    <br />
    Mark Armitage, Assistant Deputy
    <br />
    Minister Health Sector Workforce and Beneficiary Services Division
  </body>
`;
export const subjectTwo = 'REMINDER: Emergency Health Provider Registry Confirmation';
export const templateTwo = `
<body>

  <p>
    This is the second email reminder you will receive: if you are still interested in supporting
    <br/>
    future emergency health care need in the province, please register using the link below. 
    <br/>
    Thank you for your initial registration, and best wishes for the future.
  </p>
  <hr/>
    <p>
      You are receiving this email because you have registered on British Columbia's Emergency
      <br />
      Health Provider Registry (EHPR). Thank you very much for your willingness and interest in
      <br />
      supporting BC's health system.
    </p>
  
    <p>
      Since its launch, the program has adapted to respond to an increase in demand as a result of
      <br />
      climate change (e.g., wildfires, floods), as well as a global pandemic. More than 10,000 
      <br/> 
      people are currently registered with the EHPR and the Ministry of Health is undertaking a 
      <br/>
      refresh of the system to update registrant information and improve our capacity to contact
      <br/>
      and deploy registrants in a timely way.
    </p>
    

    <p>
      <b>
        <i>
        If you are still interested in being an active registrant with the EHPR and want to be 
        <br/>
        considered for current and future emergency deployments,
         <a href="https://ehpr.gov.bc.ca/submission/1">
          please click this link to register
          <br/>
          with the new system.
        </a> 
        <br/> https://www.ehpr.gov.bc.ca (if link does not work please manually
        <br/> copy and paste the URL into the browser).
        
        
        If you do not complete the new form, you will be 
        <br/>
        removed from the

        EHPR and will no longer be considered when opportunities arise.
        </b>
      </p>At this time, health authorities are interested in contacting registrants to support the <br/>
       following service areas:
    </p>
    <ul>
      <li>Hospital settings including: critical care, intensive care, emergency departments and support staff</li>
      <li>Long-term care and/or Assisted living</li>
      <li>Long-term care</li>
      <li>Home support</li>
      <li>COVID-19 specific support (such as immunization and testing)</li>
    </ul>
    <p>
    Supports may be available to registrants willing to deploy and there may be opportunities for
    <br/>
    recently retired registrants (those with Temporary Emergency Registration).If you chose to
    <br/>
    re-affirm your registration, thank you for your continued interest in the EHRP. If you do not, 
    <br/>
    thank you for your initial registration. We could not do this work without the commitment and 
    <br/>
    support of dedicated professionals like yourself. 
    <br/>
    <br/>
    If you have any questions, please email EHPRQuestions@gov.bc.ca.    
    </p>
    <br />
    Sincerely,
    <br />
    <br />
    Mark Armitage, Assistant Deputy
    <br />
    Minister Health Sector Workforce and Beneficiary Services Division
  </body>
`;

export const subjectThree = 'FINAL NOTICE: Emergency Health Provider Registry Confirmation';
export const templateThree = `
<body>
<p>
  This is the third and final email reminder about the EHPR you will receive: if you are still
  <br/>
  interested in supporting future emergency health care need in the province, please register
  <br/>
  using the link below. 
  <br/>
  Thank you for your initial registration, and best wishes for the future.
</p>
<hr/>
  <p>
    You are receiving this email because you have registered on British Columbia's Emergency
    <br />
    Health Provider Registry (EHPR). Thank you very much for your willingness and interest in
    <br />
    supporting BC's health system.
  </p>

  <p>
    Since its launch, the program has adapted to respond to an increase in demand as a result of
    <br />
    climate change (e.g., wildfires, floods), as well as a global pandemic. More than 10,000 
    <br/> 
    people are currently registered with the EHPR and the Ministry of Health is undertaking a 
    <br/>
    refresh of the system to update registrant information and improve our capacity to contact
    <br/>
    and deploy registrants in a timely way.
  </p>
  

  <p>
    <b>
      <i>
      If you are still interested in being an active registrant with the EHPR and want to be 
      <br/>
      considered for current and future emergency deployments,
       <a href="https://ehpr.gov.bc.ca/submission/1">
        please click this link to register
        <br/>
        with the new system.
      </a> 
      https://www.ehpr.gov.bc.ca (if link does not work please manually
      <br/> copy and paste the URL into the browser).
      
      
      If you do not complete the new form, you will be 
      <br/>
      removed from the

      EHPR and will no longer be considered when opportunities arise.
      </b>
    </p>At this time, health authorities are interested in contacting registrants to support the <br/>
     following service areas:
  </p>
  <ul>
    <li>Hospital settings including: critical care, intensive care, emergency departments and support staff</li>
    <li>Long-term care and/or Assisted living</li>
    <li>Long-term care</li>
    <li>Home support</li>
    <li>COVID-19 specific support (such as immunization and testing)</li>
  </ul>
  <p>
  Supports may be available to registrants willing to deploy and there may be opportunities for
  <br/>
  recently retired registrants (those with Temporary Emergency Registration).If you chose to
  <br/>
  re-affirm your registration, thank you for your continued interest in the EHRP. If you do not, 
  <br/>
  thank you for your initial registration. We could not do this work without the commitment and 
  <br/>
  support of dedicated professionals like yourself. 
  <br/>
  <br/>
  If you have any questions, please email EHPRQuestions@gov.bc.ca.    
  </p>
  <br />
  Sincerely,
  <br />
  <br />
  Mark Armitage, Assistant Deputy
  <br />
  Minister Health Sector Workforce and Beneficiary Services Division
</body>
`;

// Environment variables
const { PROD_CHES_HOST, PROD_CHES_AUTH_URL, PROD_CHES_CLIENT_SECRET, PROD_CHES_CLIENT_ID } =
  process.env;

// Five requests per second
const targetRate = 10;

const config = {
  headers: {
    authorization: null,
    'Content-Type': 'application/json',
  },
};

function generateEmailCSV(array, outputFilePath) {
  let fulltext = 'Registrant Name,Email\n';
  array.map(row => {
    fulltext += `${row.name},${row.email}\n`;
  });
  fs.writeFileSync(outputFilePath, fulltext);
}

async function authenticateChes() {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: PROD_CHES_CLIENT_ID,
      password: PROD_CHES_CLIENT_SECRET,
    }, // service client ID and secret
  };
  try {
    const response = await axios.post(PROD_CHES_AUTH_URL, params, config);
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
    from: 'EHPRDoNotReply@gov.bc.ca',
    to: recipient,
    subject: subjectThree,
    bodyType: 'html',
    body: templateThree,
  };
}
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
        row: index,
        uuid: uuidV4(),
        name: row[0].trim(),
        email: row[1].trim(),
      };
    });
}

async function sendEmail(email) {
  // const res = await axios.post(`${PROD_CHES_HOST}/api/v1/email`, createPayload(email), config);
  // return res;
  return {};
}

function printProgress(progress) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
}

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

async function sendEmails(max) {
  console.log('Running test');
  config.headers.authorization = await updateToken();
  let emails = await getEmails();
  if (emails.length > max) {
    generateEmailCSV(emails.slice(max), `out/unsent_emails${Date.now()}.csv`);
    emails = emails.slice(0, max);
  }
  console.log(emails.length);
  console.log(emails[0]);
  emails = emails = findDuplicates(emails);
  let start = new Date();
  let sent = 0;
  let errors = [];
  config.headers.authorization = await updateToken();
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
          try {
            sent++;
            await sendEmail([current.email], current.uuid, Math.random() * 1000);
          } catch (e) {
            console.log(e);
            if (e?.response?.data === 'Access denied') {
              try {
                config.headers.authorization = await updateToken();
                await sendEmail([emails.email], emails.uuid, Math.random() * 100);
              } catch (e2) {
                errors.push(current);
              }
            } else {
              errors.push(current);
            }
          }
          resolve();
        });
      }
    } else {
      // When the email queue is empty, clear the interval and store failed sends in a csv
      clearInterval(interval);
      console.log(`Completed ${sent} there were ${errors.length} errors`);
      generateEmailCSV(errors, './out/errors.csv');
    }
  }, 10);
}

async function main() {
  await sendEmails(9000);
}

main();
