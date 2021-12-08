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
  DeepPartial,
} from './validation';
import { Ret } from 'class-validator-formik/dist/convertError';

interface StepType {
  component: React.ReactElement;
  validationSchema: (data: unknown) => Ret;
  key?: keyof SubmissionType;
}

enum FormKeys {
  PERSONAL_INFORMATION = 'personalInformation',
  CONTACT_INFORMATION = 'contactInformation',
  SKILL_INFORMATION = 'skillInformation',
  AVAILABILITY_INFORMATION = 'availabilityInformation',
}

const steps: StepType[] = [
  {
    component: <Personal formKey={FormKeys.PERSONAL_INFORMATION} />,
    validationSchema: personalSchema,
    key: FormKeys.PERSONAL_INFORMATION,
  },
  {
    component: <Contact formKey={FormKeys.CONTACT_INFORMATION} />,
    validationSchema: contactSchema,
    key: FormKeys.CONTACT_INFORMATION,
  },
  {
    component: <Credential />,
    validationSchema: () => ({}),
    key: FormKeys.SKILL_INFORMATION,
  },
  {
    component: <Preferences formKey={FormKeys.AVAILABILITY_INFORMATION} />,
    validationSchema: () => ({}),
    key: FormKeys.AVAILABILITY_INFORMATION,
  },
  {
    component: <Review />,
    validationSchema: () => ({}),
  },
];

const handleValidate = (
  validator: (data: unknown) => Ret,
  values?: DeepPartial<SubmissionType>,
  key?: keyof DeepPartial<SubmissionType>,
) => {
  if (!key) return {};
  if (!values) return {};

  const errors = validator(values[key]);

  if (Object.keys(errors).length === 0) {
    return errors;
  }

  return {
    [key]: errors,
  };
};

// @todo remove DeepPartial when all form steps are implemented
export const Form: React.FC = () => {
  const formikRef = useRef<FormikProps<DeepPartial<SubmissionType>>>(null);
  const router = useRouter();

  const step = Number(router.query.step);
  const stepIndex = step - 1;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const previousStepValidation = steps[stepIndex - 1]?.validationSchema;
  const currentStepValidation = steps[stepIndex]?.validationSchema;
  const currentStepComponent = steps[stepIndex]?.component;
  const previousStepKey = steps[stepIndex - 1]?.key;
  const currentStepKey = steps[stepIndex]?.key;

  const handleSubmit = (
    values: DeepPartial<SubmissionType>,
    helpers: FormikHelpers<DeepPartial<SubmissionType>>,
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
      const errors = handleValidate(
        previousStepValidation,
        formikRef.current?.values,
        previousStepKey,
      );
      if (Object.keys(errors).length > 0) {
        router.replace('/submission/1');
      }
    };
    checkPreviousStep();
  }, [step, router, previousStepValidation, previousStepKey]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialSubmissionValues}
      validate={values => handleValidate(currentStepValidation, values, currentStepKey)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <div className='flex flex-col items-center'>
            <div className='w-full md:w-1/2 px-6 md:px-0  mb-12'>{currentStepComponent}</div>

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
