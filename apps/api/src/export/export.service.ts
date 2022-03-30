import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionEntity } from 'src/submission/entity/submission.entity';
import { Repository } from 'typeorm';
import { booleanToYesNo, getSubSpecialtyById, splitLhasByHa } from '@ehpr/common';
import exceljs, { Protection } from 'exceljs';
// No types exist for Xlsx populate
const XlsxPopulate = require('xlsx-populate');

export class ExportService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
  ) {}

  async exportSubmissions() {
    const submissions = await this.submissionRepository?.find();
    const topRow =
      'Id,First Name,Last Name,Postal Code,Primary Phone,Primary Phone Ext,Secondary Phone,Secondary Phone Ext,Email,Stream,Specialty,Subspecialties,All Specialties,Registration Status,Registration Number,Current Employment,Employment Health Authorities,Employment Circumstance,Non-Clinical Job Title,Deploy Anywhere,Vancouver/Coastal,Fraser Region,Vancouver Island Region,Interior Region,Northern Region,Placement Options,Has Immunization Training,Deployment Duration\n';
    const output = this.flattenAndTransformFormData(submissions);
    //const data = topRow + output.map((row: any) => this.formatRow(row)).join('/n');
    let workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    output.forEach((out: any, index: number) => {
      let row = worksheet.insertRow(
        index + 1,
        Object.keys(out).map(key => {
          return JSON.stringify(out[key]);
        }),
      );
      row.eachCell(cell => {
        cell.protection = {
          locked: true,
          hidden: true,
        } as any;
      });
    });
    worksheet.insertRow(1, topRow.split(','));
    await workbook.xlsx.writeFile('unencrypted.xlsx');
    await XlsxPopulate.fromFileAsync('./unencrypted.xlsx').then((workbook: any) => {
      workbook.toFileAsync('./out.xlsx', { password: 'S3cret!' });
    });
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
}
