import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ReactNode } from 'react';

type AlertProps = {
  color?: 'blue' | 'yellow' | 'red';
  children: ReactNode;
};

export const Alert = ({ color, children }: AlertProps) => {
  let containerClasses = '';
  const baseClasses = 'py-4 text-left flex items-center rounded';

  switch (color) {
    case 'red':
      containerClasses = classNames(baseClasses, 'bg-bcRedError');
      break;
    case 'yellow':
      containerClasses = classNames(baseClasses, 'bg-bcYellowCream');
      break;
    default:
      containerClasses = classNames(baseClasses, 'bg-bcLightBlueBackground');
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
