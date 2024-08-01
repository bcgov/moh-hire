import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';

type AlertProps = {
  color: 'blue' | 'yellow' | 'red';
  children: ReactNode;
};

export const Alert = ({ color, children }: AlertProps) => {
  let containerClasses = '';
  switch (color) {
    case 'red':
      containerClasses = 'bg-bcRedError py-4  text-left flex items-center rounded';
      break;
    case 'yellow':
      containerClasses = 'bg-bcYellowCream py-4  text-left flex items-center rounded';
      break;
    default:
      containerClasses = 'bg-bcLightBlueBackground py-4  text-left flex items-center rounded';
  }

  return (
    <div className={containerClasses}>
      <div className='px-5 text-bcBluePrimary'>
        <FontAwesomeIcon className='h-6' icon={faExclamationCircle}></FontAwesomeIcon>
      </div>
      <div className='text-bcBluePrimary'>{children}</div>
    </div>
  );
};
