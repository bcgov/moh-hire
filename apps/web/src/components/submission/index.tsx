import { FormikHelpers, Formik, FormikProps, Form as FormikForm } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Button } from '@components';
import { Contact, Credential, Preferences, Personal, Review } from './components';
import {
  personalSchema,
  contactSchema,
  SubmissionType,
  initialSubmissionValues,
} from './validation';

const steps = [
  {
    component: <Personal />,
    validationSchema: personalSchema,
  },
  {
    component: <Contact />,
    validationSchema: () => ({
      form: 'validation not implemented for this step',
    }),
  },
  {
    component: <Credential />,
    validationSchema: () => ({
      form: 'validation not implemented for this step',
    }),
  },
  {
    component: <Preferences />,
    validationSchema: () => ({
      form: 'validation not implemented for this step',
    }),
  },
  {
    component: <Review />,
    validationSchema: () => ({
      form: 'validation not implemented for this step',
    }),
  },
];

export const Form: React.FC = () => {
  // Using any here while the form is under construction, should be SubmissionType
  const formikRef = useRef<FormikProps<any>>(null);
  const router = useRouter();

  const step = Number(router.query.step);
  const stepIndex = step - 1;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const previousStepValidation = steps[stepIndex - 1]?.validationSchema;
  const currentStepValidation = steps[stepIndex]?.validationSchema;
  const currentStepComponent = steps[stepIndex]?.component;

  // Partial should be temporary here until the form form is completed
  const handleSubmit = (
    values: Partial<SubmissionType>,
    helpers: FormikHelpers<Partial<SubmissionType>>,
  ) => {
    if (isLastStep) {
      console.log(values); // submit
    } else {
      helpers.setTouched({});
      router.push(`/submission/${step + 1}`);
    }
    helpers.setSubmitting(false);
  };

  const goToPreviousStep = () => {
    router.push(`/submission/${Number(step) - 1}`);
  };

  /**
   * This effect handles routing and preventing access to steps in the
   * form when the previous step hasn't been completed.
   */
  useEffect(() => {
    if (!router.query.step) return;

    if (step === 1) {
      // no redirect needed on first step
      return;
    }

    const checkPreviousStep = async () => {
      const errors = previousStepValidation(formikRef.current?.values);
      if (Object.keys(errors).length > 0) {
        router.replace('/submission/1');
      }
    };
    checkPreviousStep();
  }, [step, router, previousStepValidation]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialSubmissionValues}
      validate={currentStepValidation}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <div className='flex flex-col items-center'>
            <div className='w-full md:w-1/2  mb-12'>{currentStepComponent}</div>

            <div className='flex justify-between w-10/12 md:w-1/2 mb-14'>
              <Button
                variant='secondary'
                disabled={isFirstStep}
                onClick={goToPreviousStep}
                type='button'
              >
                Go Back
              </Button>
              <Button
                variant='primary'
                disabled={isSubmitting}
                loading={isSubmitting}
                type='submit'
              >
                Continue
              </Button>
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};
