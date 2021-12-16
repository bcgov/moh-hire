import { useEffect } from 'react';
import { withRouter, NextRouter, useRouter } from 'next/router';
import { ExternalLink, Notice, Download } from '@components';

interface WithRouterProps {
  router: NextRouter;
}

const Confirmation: React.FC<WithRouterProps> = props => {
  const nextRouter = useRouter();
  const { router } = props;
  const id = router?.query?.id;

  useEffect(() => {
    // if the page is accessed directly, redirect to the home page
    if (!id) {
      nextRouter.push('/');
    }
  });
  return id ? (
    <div className='md:pt-40 pt-12 px-5 md:px-4'>
      <div className='max-w-xl text-center'>
        <div className='text-3xl md:text-4xl px-5 md:px-2 text-bcBluePrimary mb-5 '>
          Thank You For Filling Out The Form
        </div>
        <Notice>
          <p className='leading-8'>
            Your EHPR registration number: <b>{id}</b>
          </p>
        </Notice>
        <section className='px-5 mb-5'>
          <p className='mb-2'>
            You will receive an email confirmation shortly at the email address provided on the form
          </p>
          <p>
            Save a PDF copy of your complete form by clicking the Download PDF button below. For any
            further inquiries, please contact&nbsp;
            <ExternalLink href='mailto:EHPRQuestions@gov.bc.ca'>
              EHPRQuestions@gov.bc.ca
            </ExternalLink>
            .
          </p>
        </section>
        <Download icon='/assets/img/download.svg' ext='pdf' />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default withRouter(Confirmation);
