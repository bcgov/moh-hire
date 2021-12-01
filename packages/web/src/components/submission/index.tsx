import { FormikHelpers, Formik, FormikProps, Form as FormikForm } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Button } from '@components';
import { Contact, Credential, Preferences, Personal, Review } from './components';
import {
  personalSchema,
  contactSchema,
  credentialSchema,
  preferencesSchema,
  reviewSchema,
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
    validationSchema: contactSchema,
  },
  {
    component: <Credential />,
    validationSchema: credentialSchema,
  },
  {
    component: <Preferences />,
    validationSchema: preferencesSchema,
  },
  {
    component: <Review />,
    validationSchema: reviewSchema,
  },
];

export const Form: React.FC = () => {
  const formikRef = useRef<FormikProps<SubmissionType>>(null);
  const router = useRouter();

  const step = Number(router.query.step);
  const stepIndex = step - 1;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const previousStepValidation = steps[stepIndex - 1]?.validationSchema;
  const currentStepValidation = steps[stepIndex]?.validationSchema;
  const currentStepComponent = steps[stepIndex]?.component;

  const handleSubmit = (values: SubmissionType, helpers: FormikHelpers<SubmissionType>) => {
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
      if (!(await previousStepValidation?.isValid(formikRef.current?.values))) {
        router.replace('/submission/1');
      }
    };
    checkPreviousStep();
  }, [step, router, previousStepValidation]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialSubmissionValues}
      validationSchema={currentStepValidation}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <FormikForm>
          <div className='flex flex-col items-center'>
            <div className='w-full md:w-1/2  mb-12'>{currentStepComponent}</div>

            {/* For example sake, to remove */}
            {errors ? (
              <div className='text-red-500 text-center mt-4'>
                {Object.values(errors).map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
            {/* For example sake, to remove */}

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
