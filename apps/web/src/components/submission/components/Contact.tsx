import { Field, FormStepHeader } from '@components';
import { FormStepProps } from '.';

export const Contact: React.FC<FormStepProps> = ({ formKey }) => {
  const fieldNames = {
    primaryPhone: `${formKey}.primaryPhone`,
    primaryPhoneExt: `${formKey}.primaryPhoneExt`,
    secondaryPhone: `${formKey}.secondaryPhone`,
    secondaryPhoneExt: `${formKey}.secondaryPhoneExt`,
    email: `${formKey}.email`,
  };
  return (
    <>
      <FormStepHeader>2. Contact Information</FormStepHeader>
      <div className='flex flex-col gap-5'>
        <div className='grid grid-cols-3 gap-3 items-end'>
          <div className='col-span-2'>
            <Field
              name={fieldNames.primaryPhone}
              label='Primary Phone Number'
              type='text'
              description='(xxx xxx xxxx)'
            />
          </div>
          <div className='col-span-1'>
            <Field name={fieldNames.primaryPhoneExt} label='Ext. (optional)' type='text' />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-3 items-end'>
          <div className='col-span-2'>
            <Field
              name={fieldNames.secondaryPhone}
              label='Secondary Phone Number (optional)'
              type='text'
              description='(xxx xxx xxxx)'
            />
          </div>
          <div className='col-span-1'>
            <Field name={fieldNames.secondaryPhoneExt} label='Ext. (optional)' type='text' />
          </div>
        </div>

        <Field name={fieldNames.email} label='Email' type='email' />
      </div>
    </>
  );
};
