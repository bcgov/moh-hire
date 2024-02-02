import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FullScreenModal, FullScreenModalFooter } from '../FullScreenModal';
import { CreateTemplate } from './CreateTemplate';
import { Button } from '../Button';
import { TemplatePreview } from './TemplatePreview';
import { EmailTemplate } from '@constants';

interface EmailCampaignProps {
  open: boolean;
  close: (value: boolean) => void;
}

export const EmailCampaign = (props: EmailCampaignProps) => {
  const { open, close } = props;

  const [openTemplatePreview, setOpenTemplatePreview] = useState<boolean>(false);
  const [template, setTemplate] = useState<EmailTemplate>({ subject: '', body: '' });

  // close template modal
  const handleClose = () => {
    close(false);
  };

  // show template preview modal
  const showPreview = () => {
    setOpenTemplatePreview(true);
  };

  // hide template preview modal
  const closePreview = () => {
    setOpenTemplatePreview(false);
  };

  return (
    <FullScreenModal open={open} handleClose={handleClose}>
      <FullScreenModal.Title className='flex flex-row text-lg font-bold leading-6 text-bcBlueLink border-b p-4'>
        <div>Create Email Template</div>
        <button className='ml-auto' onClick={handleClose}>
          <FontAwesomeIcon icon={faWindowClose} size='2x' />
        </button>
      </FullScreenModal.Title>
      <div className='p-4 mt-4'>
        {/* create template modal */}
        <CreateTemplate template={template} setTemplate={setTemplate} />
        {/* template preview */}
        {openTemplatePreview && template.body && (
          <TemplatePreview open={open} onClose={closePreview} template={template} />
        )}
      </div>
      <FullScreenModalFooter>
        <Button variant='primary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={showPreview} disabled={!template.body}>
          Show Preview
        </Button>
      </FullScreenModalFooter>
    </FullScreenModal>
  );
};
