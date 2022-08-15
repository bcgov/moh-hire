import { readFileSync } from 'fs';
import { v4 as uuidV4 } from 'uuid';
import csvWriter from 'csv-writer';

function getEmails() {
  // await new Promise(resolve => {
  //   setTimeout(resolve(), 1000);
  // });
  const file = readFileSync('./in/emails-full.csv').toString();
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

function getSubmissions() {
  const file = readFileSync('./out/submission_export.csv').toString();
  // Split the string into rows, discard the columns row
  return file
    .split('\n')
    .slice(1)
    .map((rowString, index) => {
      // Split each row into it's variables

      let row = rowString.split(',');
      return {
        row: index,
        uuid: row[1].trim(),
        name: row[2].trim() + ' ' + row[3].trim(),
        email: row[8].trim(),
      };
    });
}

const formatColumnHeader = [
  {
    id: 'name',
    title: 'Registrant Name',
  },
  { id: 'email', title: 'Email' },
];

export const emailErrorHeaders = [
  { id: 'id', title: 'Id' },

  // Primary Information
  { id: 'firstName', title: 'First Name' },
  { id: 'lastName', title: 'Last Name' },
  { id: 'postalCode', title: 'Postal Code' },

  // Contact Information
  { id: 'primaryPhone', title: 'Primary Phone' },
  { id: 'primaryPhoneExt', title: 'Primary Phone Ext' },
  { id: 'secondaryPhone', title: 'Secondary Phone' },
  { id: 'secondaryPhoneExt', title: 'Secondary Phone Ext' },
  { id: 'email', title: 'Email' },

  // Credential Information
  { id: 'stream', title: 'Stream' },
  { id: 'specialty', title: 'Specialty' },
  { id: 'subspecialties', title: 'Subspecialties' },
  { id: 'allSpecialties', title: 'All Specialties' },
  { id: 'registrationStatus', title: 'Registration Status' },
  { id: 'registrationNumber', title: 'Registration Number' },
  { id: 'currentEmployment', title: 'Current Employment' },
  { id: 'healthAuthorities', title: 'Employment Health Authorities' },
  { id: 'employmentCircumstance', title: 'Employment Circumstance' },
  { id: 'nonClinicalJobTitle', title: 'Non-Clinical Job Title' },

  // Preferences
  { id: 'deployAnywhere', title: 'Deploy Anywhere' },
  { id: 'VancouverCoastal', title: 'Vancouver/Coastal' },
  { id: 'FraserRegion', title: 'Fraser Region' },
  { id: 'VancouverIslandRegion', title: 'Vancouver Island Region' },
  { id: 'InteriorRegion', title: 'Interior Region' },
  { id: 'NorthernRegion', title: 'Northern Region' },
  { id: 'placementOptions', title: 'Placement Options' },
  { id: 'hasImmunizationTraining', title: 'Has Immunization Training' },
  { id: 'deploymentDuration', title: 'Deployment Duration' },
];

async function main() {
  const emails = getEmails();
  const submittedEmails = getSubmissions();

  console.log(submittedEmails[0]);
  console.log(emails.length);
  console.log(submittedEmails.length);
  const final = [];
  const emailErrors = [];
  emails.map(emailRow => {
    if (
      !submittedEmails.find(row => {
        return row.email.toLowerCase() === emailRow.email.toLowerCase();
      })
    ) {
      final.push(emailRow);
    }
    if (!emailRow.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/gm)) {
      emailErrors.push(emailRow);
    }
  });
  const createCsvWriter = csvWriter.createObjectCsvWriter;
  const writer = createCsvWriter({
    path: './out/finalEmails.csv',
    header: formatColumnHeader,
    encoding: 'utf-8',
  });
  const errorWriter = createCsvWriter({
    path: './out/finalEmailErrors.csv',
    header: emailErrorHeaders,
    encoding: 'utf-8',
  });
  console.log(`There were ${emailErrors.length} errors`);
  await errorWriter.writeRecords(emailErrors);
  await writer.writeRecords(final);
}

main();
