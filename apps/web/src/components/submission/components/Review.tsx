import { FormStepHeader, Link } from '@components';
import { EmploymentTypes, SpecialtyDTO } from '@ehpr/common';
import { useFormikContext } from 'formik';
import {
  employmentCircumstanceOptions,
  employmentOptions,
  getOptionLabelByValue,
  getSpecialtyLabelById,
  getStreamLabelById,
  getSubspecialtyLabelById,
  healthAuthorityOptions,
  registrationStatusOptions,
  SubmissionType,
} from '../validation';

export const Review: React.FC = () => {
  const { values } = useFormikContext<SubmissionType>();
  const { personalInformation, contactInformation, skillInformation } = values;
  const { firstName, lastName, postalCode } = personalInformation;
  const { primaryPhone, primaryPhoneExt, secondaryPhone, secondaryPhoneExt, email } =
    contactInformation;
  const {
    stream,
    specialties,
    registrationStatus,
    registrationNumber,
    currentEmployment,
    employmentCircumstance,
    healthAuthorities,
  } = skillInformation;

  return (
    <>
      <FormStepHeader>5. Review and Submit</FormStepHeader>
      <div className='grid grid-cols-1 divide-y divide-gray-400 -my-7'>
        <ReviewSection sectionHeader='Primary Information' step={1} columns={3}>
          <ReviewItem label='First Name' value={firstName} />
          <ReviewItem label='Last Name' value={lastName} />
          <ReviewItem label='Postal Code' value={postalCode} />
        </ReviewSection>

        <ReviewSection sectionHeader='Contact Information' step={2} columns={2}>
          <ReviewItem
            label='Primary Phone Number'
            value={phoneNumberWithExtension(primaryPhone, primaryPhoneExt)}
          />
          <ReviewItem
            label='Secondary Phone Number'
            value={phoneNumberWithExtension(secondaryPhone, secondaryPhoneExt)}
          />
          <ReviewItem label='Email Address' value={email} />
        </ReviewSection>

        <ReviewSection sectionHeader='Credential Information' step={3} columns={1}>
          <ReviewItem label='Stream Type' value={getStreamLabelById(stream)} />
          {specialties.map((specialty: SpecialtyDTO) => (
            <ReviewSpecialty key={specialty.id} specialty={specialty} />
          ))}
          <ReviewItem
            label='Select which best applies to your current registration status'
            value={getOptionLabelByValue(registrationStatusOptions, registrationStatus)}
          />
          {registrationNumber ? (
            <ReviewItem
              label='Indicate your registration number from your credentialing body'
              value={registrationNumber}
            />
          ) : null}
          <ReviewItem
            label='Select which best applies to your current employment status'
            value={getOptionLabelByValue(employmentOptions, currentEmployment)}
          />
          {currentEmployment === EmploymentTypes.HEALTH_SECTOR_EMPLOYED ? (
            <ReviewItemList
              label='Indicate where you are employed (select all that apply)'
              values={healthAuthorities?.map(healthAuthority =>
                getOptionLabelByValue(healthAuthorityOptions, healthAuthority),
              )}
            />
          ) : null}
          {currentEmployment === EmploymentTypes.HEALTH_SECTORY_RESIDENCY ? (
            <ReviewItemList
              label='Indicate where you are doing your practicum/residency (select all that apply)'
              values={healthAuthorities?.map(healthAuthority =>
                getOptionLabelByValue(healthAuthorityOptions, healthAuthority),
              )}
            />
          ) : null}
          {currentEmployment === EmploymentTypes.NOT_HEALTH_SECTOR_EMPLOYED ? (
            <ReviewItem
              label='Select your circumstance'
              value={getOptionLabelByValue(employmentCircumstanceOptions, employmentCircumstance)}
            />
          ) : null}
        </ReviewSection>
      </div>
    </>
  );
};

const phoneNumberWithExtension = (phoneNumber: string, extension?: string) => {
  if (extension) {
    return phoneNumber + ' | ' + extension;
  }
  return phoneNumber;
};

interface ReviewSectionProps {
  sectionHeader: string;
  step: number;
  columns: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  sectionHeader,
  step,
  columns,
  children,
}) => {
  return (
    <div className='py-7'>
      <div className='flex items-center gap-4 mb-3'>
        <h2 className='text-bcBluePrimary text-xl'>{sectionHeader}</h2>
        <Link href={`/submission/${step}`} variant='outline'>
          Edit
        </Link>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-7`}>{children}</div>
    </div>
  );
};

interface ReviewItemProps {
  label: string;
  value?: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ label, value }) => {
  return (
    <div className=''>
      <h3 className='font-bold mb-2'>{label}</h3>
      {value ? <p className='break-words'>{value}</p> : null}
    </div>
  );
};

interface ReviewItemListProps {
  label: string;
  values?: (string | undefined)[];
}

const ReviewItemList: React.FC<ReviewItemListProps> = ({ label, values }) => {
  return (
    <div className=''>
      <h3 className='font-bold mb-2'>{label}</h3>
      {values ? (
        <ul>
          {values?.map(value => (
            <li key={value} className='mb-2'>
              {value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

interface ReviewSpecialtyProps {
  specialty: SpecialtyDTO;
}
const ReviewSpecialty: React.FC<ReviewSpecialtyProps> = ({ specialty }) => {
  return (
    <div className='grid grid-cols-2 rounded border border-gray-300 p-2'>
      <ReviewItem label='Main Speciality' value={getSpecialtyLabelById(specialty.id)} />
      <ReviewItemList
        label='Subspeciality'
        values={specialty.subspecialties?.map(subspecialty =>
          getSubspecialtyLabelById(subspecialty.id),
        )}
      />
    </div>
  );
};
