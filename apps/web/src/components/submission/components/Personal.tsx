import { FormField, FormStepHeader } from '@components';

export const Personal: React.FC = () => {
  return (
    <>
      <FormStepHeader>1. Primary Information</FormStepHeader>
      <div className='flex flex-col gap-5'>
        <FormField name='firstName' label='First Name' type='text' />
        <FormField name='lastName' label='Last Name' type='text' />
        <FormField
          name='postalCode'
          label='PostalCode'
          description='The right format should be A1A1A1'
          type='text'
        />
      </div>
    </>
  );
};
