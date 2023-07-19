import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UpdateSubmissionForm } from '../components/submission/components';

const UpdateSubmission = () => {
  const { push, query, isReady } = useRouter();
  const { code, email } = query;

  useEffect(() => {
    if (isReady && !code) {
      push('/');
    }
  }, [code, isReady, push]);

  return (
    <div className='flex flex-col justify-center'>
      {email && code && <UpdateSubmissionForm email={email as string} code={code as string} />}
    </div>
  );
};

export default UpdateSubmission;
