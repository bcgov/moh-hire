import { Template } from '@ehpr/common';
import { Modal } from '@components';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TemplateEditorProps {
  template: Template;
  open: boolean;
  onClose: () => void;
}

export const TemplateEditor = ({ template, open, onClose }: TemplateEditorProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal open={open} handleClose={handleClose}>
        <Modal.Title>Modal Editor</Modal.Title>
        <Markdown remarkPlugins={[remarkGfm]}>{template.content}</Markdown>
      </Modal>
    </div>
  );
};
