import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmissionRO } from '@ehpr/common';
import { getSubmission } from '@services';
import { UpdateSubmissionForm } from '../components/submission/components';

const UpdateSubmission = () => {
  const { push, query, isReady } = useRouter();
  const { code } = query;
  const [submission, setSubmission] = useState<SubmissionRO | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isReady && !code) {
      push('/');
    }
  }, [code, isReady, push]);

  useEffect(() => {
    if (!code) return;

    getSubmission(code as string)
      .then(setSubmission)
      .catch(() => {
        setError('Submission record not found');
      });
  }, [code]);

  return (
    <div className='flex flex-col justify-center'>
      {!submission ? <div>{error}</div> : <UpdateSubmissionForm submission={submission} />}
    </div>
  );
};

export default UpdateSubmission;
