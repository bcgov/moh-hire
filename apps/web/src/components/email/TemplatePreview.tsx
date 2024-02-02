import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  FullScreenModal,
  FullScreenModalFooter,
  useAuthContext,
  useEmailContext,
} from '@components';
import { sendMassEmail } from '@services';
import { EmailTemplate } from '@constants';

// module options for react quill
const modules = {
  toolbar: false,
};

interface TemplatePreviewProps {
  template: EmailTemplate;
  open: boolean;
  onClose: () => void;
}

export const TemplatePreview = ({ template, open, onClose }: TemplatePreviewProps) => {
  const { emails } = useEmailContext();
  const { user } = useAuthContext();
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  // current list of select registrant emails
  const [showEmailList, setShowEmailList] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // handler for sending test email
  const handleSendEmailTest = async () => {
    setLoading(true);
    if (user?.email) {
      await sendMassEmail({ subject: template.subject, body: template.body, emails: [user.email] });
    }
    setLoading(false);
  };

  // handler for showing selected registrant emails for mass email send
  const handleShowEmailList = () => {
    setShowEmailList(prev => !prev);
  };

  return (
    <FullScreenModal open={open} handleClose={onClose}>
      <FullScreenModal.Title className='flex flex-row text-lg font-bold leading-6 text-bcBlueLink border-b p-4'>
        <div>Template Preview</div>
        <button className='ml-auto' onClick={onClose}>
          <FontAwesomeIcon icon={faWindowClose} size='2x' />
        </button>
      </FullScreenModal.Title>
      <FullScreenModal.Description className='p-4'>
        Please review the template and send a test email below:
      </FullScreenModal.Description>

      <div className='mx-5 mb-5 border-b'>
        <Button
          variant='primary'
          type='submit'
          onClick={() => handleSendEmailTest()}
          loading={loading}
        >
          Send Test Email
        </Button>
        <p className='py-4'>
          <i>This will send an email to the one tied to this current account.</i>
        </p>
      </div>

      {/* read only editor for preview */}
      <div className='mx-5 font-bold'>Subject Line</div>
      <div className='flex flex-row p-2 my-1 mx-5 border '>
        <input
          name='subject-line'
          type='text'
          value={template.subject}
          readOnly
          className='flex-grow focus:outline-none'
        />
      </div>
      <div className='mx-5 mt-2 font-bold'>Body</div>
      <ReactQuill className='px-5 my-1' value={template.body} readOnly modules={modules} />
      <div className='m-5'>
        <Button variant='primary' onClick={() => handleShowEmailList()}>
          Review Sending list
        </Button>

        {showEmailList && (
          <div className='grid grid-cols-3 p-5 min-h-52 max-h-96 overflow-y-auto'>
            <div className='col-span-3 my-3 mr-3'>
              <strong>Total Emails:</strong> {emails.length}
            </div>
            {emails.map(({ email, name }) => (
              <div key={email + name} className='w-full mb-2'>
                <span>
                  <strong>Name: </strong>
                  {name}
                </span>
                <p>
                  <strong>Email: </strong>
                  {email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <FullScreenModalFooter>
        <Button variant='primary' onClick={onClose}>
          Edit Template
        </Button>
        {/* TODO: implement mass email send */}
        <Button variant='secondary' disabled={true}>
          Send
        </Button>
      </FullScreenModalFooter>
    </FullScreenModal>
  );
};
