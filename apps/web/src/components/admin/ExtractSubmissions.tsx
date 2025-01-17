import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox } from '@components';

import { extractSubmissions } from '@services';
import { Formik } from 'formik';

export const ExtractSubmissions = () => {
  const downloadSubmissions = async (values: { anywhereOnly: boolean }) => {
    const data = await extractSubmissions(values?.anywhereOnly);
    if (data) {
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `ehpr-submissions-${dayjs().format('YYYY-MM-DD')}.csv`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className='w-full'>
      <p className='mb-2'>
        Extract and download all submission data in <b>CSV</b> format.
      </p>
      <Formik
        initialValues={{
          anywhereOnly: false,
        }}
        validate={values => {}}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ values }) => {
          return (
            <div className='flex flex-col gap-4 max-w-sm'>
              <Checkbox
                label={`Only include applicants who are willing to work anywhere`}
                name='anywhereOnly'
              />
              <Button
                variant='primary'
                type='submit'
                onClick={() => {
                  downloadSubmissions(values);
                }}
              >
                <FontAwesomeIcon icon={faFileDownload} size='1x' className='mr-2' />
                <span>Extract Submissions</span>
              </Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
