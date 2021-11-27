import Link from 'next/link';
import { useRouter } from 'next/router';

import { Form, Stepper } from '@components';

const FORM_STEPS = ['Primary', 'Contact', 'Credential', 'Preferences', 'Review and Submit'];

const Submission = () => {
  const router = useRouter();

  const step = Number(router.query.step);

  return (
    <Form>
      <div className='w-full p-4 border-b'>
        <Stepper formSteps={FORM_STEPS} step={step} />
      </div>
      <div className='flex justify-center'>
        <Link href={step === 1 ? '/submission/1' : `/submission/${Number(step) - 1}`}>
          <a
            type='button'
            className='w-full md:w-40 px-8 py-2 btn btn-outline md:mb-0 mr-0 text-center'
          >
            Go Back
          </a>
        </Link>
        <Link
          href={
            step === FORM_STEPS.length
              ? `/submission/${FORM_STEPS.length}`
              : `/submission/${Number(step) + 1}`
          }
        >
          <a
            type='button'
            className='w-full md:w-40 px-8 py-2 btn btn-outline md:mb-0 mr-0 text-center'
          >
            Continue
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default Submission;
