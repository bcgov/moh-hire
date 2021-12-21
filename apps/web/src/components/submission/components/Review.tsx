import { FormStepHeader, Link } from '@components';
import { useFormikContext } from 'formik';
import { SubmissionType } from '../validation';

export const Review: React.FC = () => {
  const { values } = useFormikContext<SubmissionType>();
  const { personalInformation, contactInformation } = values;
  const { firstName, lastName, postalCode } = personalInformation;
  const { primaryPhone, primaryPhoneExt, secondaryPhone, secondaryPhoneExt, email } =
    contactInformation;

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
      <div className={`grid grid-cols-${columns} gap-7`}>{children}</div>
    </div>
  );
};

interface ReviewItemProps {
  label: string;
  value: string | React.ReactNode;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ label, value }) => {
  return (
    <div className=''>
      <h3 className='font-bold mb-2'>{label}</h3>
      <p className='break-all'>{value}</p>
    </div>
  );
};
