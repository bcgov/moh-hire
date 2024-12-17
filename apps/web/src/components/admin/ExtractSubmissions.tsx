import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components';
import { extractSubmissions } from '@services';
import { Checkbox } from '@components';

export const ExtractSubmissions = () => {
  const downSubmissions = async () => {
    const data = await extractSubmissions();
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
      <Checkbox
        label={`Include only applicants who are willing to work anywhere`}
        name='anywhere-only'
      />
      <Button variant='outline' onClick={downSubmissions}>
        <FontAwesomeIcon icon={faFileDownload} size='1x' className='mr-2' />
        <span>Extract Submissions</span>
      </Button>
    </div>
  );
};
