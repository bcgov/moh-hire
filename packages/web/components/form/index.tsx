import { FormikHelpers, Formik, FormikProps, Form as FormikForm } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { Button, Link } from '@components';
import { Contact, Credential, Preferences, Primary, Review } from './components';
import {
  primarySchema,
  contactSchema,
  credentialSchema,
  preferencesSchema,
  reviewSchema,
  SubmissionType,
  initialSubmissionValues,
} from './validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const steps = [
  {
    component: <Primary />,
    validationSchema: primarySchema,
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
      console.log(formikRef.current?.values);

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
          {currentStepComponent}
          {errors ? (
            <div className='text-red-500 text-center mt-4'>
              {Object.values(errors).map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
          <div className='flex justify-center'>
            <Link
              variant='secondary'
              href={step === 1 ? '/submission/1' : `/submission/${Number(step) - 1}`}
            >
              Go Back
            </Link>
            <Button variant='primary' disabled={isSubmitting} type='submit'>
              {isSubmitting ? (
                <FontAwesomeIcon icon={faSpinner} className='h-5 w-5 animate-spin' />
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};
