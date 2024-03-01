import { useState } from 'react';

import createValidator from 'class-validator-formik';
import { FieldProps, Formik, Form as FormikForm } from 'formik';
import { useRouter } from 'next/router';
import ReactSelect from 'react-select';
import { Button, Field, OptionType, selectStyleOverride } from '@components';
import { UnsubscribeReasonDTO, unsubscribeReasons } from '@ehpr/common';
import { unsubscribe } from '@services';
import { DeepPartial } from 'src/components/submission/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
  reason: '',
  otherReason: '',
};

const UnsubscribePage = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { token } = router.query;

  const validator = createValidator(UnsubscribeReasonDTO);

  const handleSubmit = async (values: DeepPartial<UnsubscribeReasonDTO>) => {
    const { status, data } = await unsubscribe(token as string, values);
    if (status === 200 && data) {
      setShowSuccess(true);
    }
  };

  return (
    <>
      {!showSuccess ? (
        <div className='container pt-12 px-44'>
          <Formik initialValues={initialValues} validate={validator} onSubmit={handleSubmit}>
            {({ values, isSubmitting }) => (
              <FormikForm>
                <div className='flex flex-col items-center w-full border border-black rounded p-5'>
                  <div className='text-xl font-bold mb-1'>Reason for Unsubscribing</div>
                  <p className='text-sm'>
                    If this was an accident, you may close the window and stay subscribed.
                  </p>
                  <div className='w-full mt-5'>
                    <Field
                      name='reason'
                      label='Reason'
                      component={({ field, form }: FieldProps) => (
                        <ReactSelect<OptionType>
                          inputId={field.name}
                          value={unsubscribeReasons.find(r => r.value === field.value)}
                          onBlur={field.onBlur}
                          onChange={value => {
                            form.setFieldValue(field.name, value?.value);
                            if (value?.value !== 'other') {
                              form.setFieldValue('otherReason', '');
                              form.setFieldTouched('otherReason', false);
                              form.setFieldError('otherReason', '');
                            }
                          }}
                          options={unsubscribeReasons.map(r => ({
                            ...r,
                            isDisabled: r.value === field.value,
                          }))}
                          styles={selectStyleOverride}
                        />
                      )}
                    />
                  </div>
                  {values.reason === 'Other (please specify)' && (
                    <div className='w-full mt-2'>
                      <Field name='otherReason' label='Please specify the reason' type='text' />
                    </div>
                  )}
                  <div className='flex flex-row w-full justify-end mt-4'>
                    <Button
                      variant='primary'
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      type='submit'
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      ) : (
        <div className='flex flex-col justify-center'>
          <div className='font-bold text-2xl mb-2'>
            Thank you{' '}
            <FontAwesomeIcon className='h-6 text-green-500' icon={faCheckCircle}></FontAwesomeIcon>
          </div>
          <p>You are now unsubscribed from further contact. You may close this window.</p>
        </div>
      )}
    </>
  );
};

export default UnsubscribePage;
