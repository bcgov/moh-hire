import { FormField, FormStepHeader } from '@components';

export const Contact: React.FC = () => {
  return (
    <>
      <FormStepHeader>2. Contact Information</FormStepHeader>
      <div className='flex flex-col gap-5'>
        <div className='grid grid-cols-3 gap-3 items-end'>
          <div className='col-span-2'>
            <FormField
              name='primaryPhone'
              label='Primary Phone Number'
              type='text'
              description='(xxx xxx xxxx)'
            />
          </div>
          <div className='col-span-1'>
            <FormField name='primaryPhoneExt' label='Ext. (optional)' type='text' />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-3 items-end'>
          <div className='col-span-2'>
            <FormField
              name='secondaryPhone'
              label='Secondary Phone Number (optional)'
              type='text'
              description='(xxx xxx xxxx)'
            />
          </div>
          <div className='col-span-1'>
            <FormField name='secondaryPhoneExt' label='Ext. (optional)' type='text' />
          </div>
        </div>

        <FormField name='email' label='Email' type='email' />
      </div>
    </>
  );
};
