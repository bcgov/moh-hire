import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { EmailTemplate } from '@constants';

interface CreateTemplateProps {
  template: EmailTemplate;
  setTemplate: Dispatch<SetStateAction<EmailTemplate>>;
}

export const CreateTemplate = (props: CreateTemplateProps) => {
  // disable ssr, needed for use in nextjs to load properly in browser, relies on 'document' object
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const { template, setTemplate } = props;

  const onChange = useCallback((value: string) => {
    setTemplate((prev: EmailTemplate) => ({ ...prev, body: value }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex flex-row p-2 mb-2 border rounded'>
        <input
          name='subject-line'
          type='text'
          value={template.subject}
          onChange={e =>
            setTemplate((prev: EmailTemplate) => ({ ...prev, subject: e.target.value }))
          }
          className='flex-grow focus:outline-none'
          placeholder='Enter Subject line...'
        />
      </div>
      <ReactQuill
        theme='snow'
        value={template.body}
        placeholder='Enter Email body...'
        onChange={onChange}
      />
    </>
  );
};
