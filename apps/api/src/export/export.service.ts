import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionEntity } from 'src/submission/entity/submission.entity';
import { Repository } from 'typeorm';
import { booleanToYesNo, getSubSpecialtyById, splitLhasByHa } from '@ehpr/common';
import xlsx from 'xlsx';
import { randomUUID } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse';
// eslint-disable-next-line
const XlsxPopulate = require('xlsx-populate');

const formExportColumnHeaders = [
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

export class ExportService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    private readonly mailService: MailService,
  ) {}
  async formatSubmission() {
    const fileContent = readFileSync('./submission_export.csv', { encoding: 'utf-8' });
    parse(
      fileContent,
      {
        delimiter: ',',
        columns: formExportColumnHeaders.map(column => column.title),
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        const workbook = xlsx.utils.book_new();
        result = result.slice(1);
        const sheet = xlsx.utils.json_to_sheet(result);
        xlsx.utils.book_append_sheet(workbook, sheet);
        // Create unprotected csv
        await xlsx.writeFileXLSX(workbook, 'unencrypted.xlsx');
        await XlsxPopulate.fromFileAsync('./unencrypted.xlsx').then((workbook: any) => {
          // Either use ENV for the password or make the file inaccessible.
          workbook.toFileAsync('./encrypted.xlsx', {
            password: randomUUID(),
          });
        });
      },
    );
  }
  async exportSubmissions() {
    // Get all submissions
    const submissions = await this.submissionRepository?.find();
    // fortmat all rows
    const output = this.flattenAndTransformFormData(submissions);
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(output);
    xlsx.utils.book_append_sheet(workbook, sheet);
    // Create unprotected
    await xlsx.writeFileXLSX(workbook, 'unencrypted.xlsx');
    await XlsxPopulate.fromFileAsync('./unencrypted.xlsx').then((workbook: any) => {
      // Either use ENV for the password or make the file inaccessible.
      workbook.toFileAsync('./encrypted.xlsx', {
        password: process.env.XLSX_PASSWORD || randomUUID(),
      });
    });
    const buff = readFileSync('./encrypted.xlsx', { encoding: 'base64' });
    if (process.env.EXPORT_EMAIL) {
      await this.mailService.sendMailWithChes({
        to: [process.env.EXPORT_EMAIL || ''],
        from: 'EHPRDoNotReply@gov.bc.ca',
        subject: 'EHPR export for today',
        body: 'Test Export',
        attachments: [
          {
            contentType: 'xlsx',
            encoding: 'base64',
            filename: './encrypted.xlsx',
            content: buff,
          },
        ],
      });
    }
  }
  flattenAndTransformFormData = (submissions: Array<SubmissionEntity>): any => {
    const flatNormalizedSubmissions: Array<any> = [];
    submissions
      .map(({ id, payload }) => ({
        id,
        payloadObject: JSON?.parse(JSON?.stringify(payload)),
      }))
      ?.forEach(({ id, payloadObject }) => {
        const {
          personalInformation,
          contactInformation,
          credentialInformation,
          preferencesInformation,
        } = payloadObject;

        const deploymentLocations = preferencesInformation?.deploymentLocations;
        const healthAuthorities = splitLhasByHa(deploymentLocations);

        const payloadData = {
          Id: id,

          'First Name': personalInformation?.firstName,
          'Last Name': personalInformation?.lastName,
          'Postal Code': personalInformation?.postalCode,

          'Primary Phone': contactInformation?.primaryPhone,
          'Primary Phone Ext': contactInformation?.primaryPhoneExt,
          'Secondary Phone': contactInformation?.secondaryPhone,
          'Secondary Phone Ext': contactInformation?.secondaryPhoneExt,
          Email: contactInformation?.email,

          Stream: credentialInformation?.stream,
          Specialty: '',
          Subspecialties: '',
          'Registration Status': credentialInformation?.registrationStatus,
          'Registration Number': credentialInformation?.registrationNumber,
          'Current Employment': credentialInformation?.currentEmployment,

          'Health Authiorities': credentialInformation?.healthAuthorities,
          'Employment Circumstance': credentialInformation?.employmentCircumstance,
          'Non-clinical Job Title': credentialInformation?.nonClinicalJobTitle,

          'Deploy Anywhere': booleanToYesNo(preferencesInformation?.deployAnywhere),
          'Vancouver/Coastal': healthAuthorities?.VancouverRegion?.lhas?.join(', '),
          'Fraser Region': healthAuthorities?.FraserRegion?.lhas?.join(', '),
          'Vancouver Island Region': healthAuthorities?.VancouverIslandRegion?.lhas?.join(', '),
          'Interior Region': healthAuthorities?.InteriorRegion?.lhas?.join(', '),
          'Northern Region': healthAuthorities?.NorthernRegion?.lhas?.join(', '),

          'Deployment Locations': preferencesInformation?.deploymentLocations,
          'Placement Options': preferencesInformation?.placementOptions,
          'Has Immunization Training': booleanToYesNo(
            preferencesInformation?.hasImmunizationTraining,
          ),
          'Deployment Duration': preferencesInformation?.deploymentDuration,
        };

        if (credentialInformation?.specialties?.length === 0) {
          flatNormalizedSubmissions?.push({ ...payloadData });
        } else {
          credentialInformation?.specialties?.forEach((specialty: any) => {
            flatNormalizedSubmissions?.push({
              ...payloadData,
              'Placement Options': specialty?.id,
              'Registration Status': specialty?.subspecialties
                ?.map((subspecialty: any) => getSubSpecialtyById(subspecialty?.id)?.name)
                ?.join(','),
            });
          });
        }
      });

    return flatNormalizedSubmissions;
  };
  async decryptFile() {
    await XlsxPopulate.fromFileAsync('./encrypted_email_list.xlsx', { password: 'Flower' }).then(
      (workbook: any) => {
        workbook.toFileAsync('./unencrypted_email_list.xlsx');
      },
    );
  }
}
