import { Entity, Column, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database/base.entity';
import { EmploymentTypes, streamsById, SubmissionPayloadDTO } from '@ehpr/common';

@Entity('submission')
export class SubmissionEntity extends BaseEntity {
  @Exclude()
  @Column('jsonb', { nullable: false })
  payload!: SubmissionPayloadDTO;

  @Column('varchar', { nullable: true })
  confirmationId!: string;

  @Exclude()
  @Column('varchar', { nullable: true })
  chesId?: string;

  @Exclude()
  @Column('varchar', { nullable: false })
  version!: string;
  @BeforeInsert()
  beforeInsert() {
    let { contactInformation, skillInformation, availabilityInformation } = this.payload;

    // Remove specialties if the stream is non clinical
    if (skillInformation.stream && skillInformation.stream !== streamsById.Nonclinical.id) {
      this.payload.skillInformation.specialties = [];
    }

    // Remove Health authorities if the user is not a resident or employed
    if (
      [EmploymentTypes.HEALTH_SECTOR_EMPLOYED, EmploymentTypes.HEALTH_SECTORY_RESIDENCY].includes(
        skillInformation.currentEmployment,
      )
    ) {
      this.payload.skillInformation.healthAuthorities = [];
    }

    // Remove current employment if the user is not currently employed
    if (EmploymentTypes.NOT_HEALTH_SECTOR_EMPLOYED === skillInformation.currentEmployment) {
      this.payload.skillInformation.employmentCircumstance = undefined;
    }
    if (this.payload.skillInformation.stream !== streamsById.Nonclinical.id) {
      delete this.payload.skillInformation.nonClinicalJobTitle;
    }

    // Remove deployment locations if the user agrees to deploy anywhere.
    if (availabilityInformation.deployAnywhere) {
      this.payload.availabilityInformation.deploymentLocations = [];
    }

    // Remove secondary phone if there is no primary
    if (!contactInformation.primaryPhone) {
      this.payload.contactInformation.secondaryPhone = '';
      this.payload.contactInformation.secondaryPhoneExt = '';
    }
  }
}
