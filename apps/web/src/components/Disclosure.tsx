import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Disclosure as HeadlessDisclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import classnames from 'classnames';

interface DisclosureProps {
  buttonText: React.ReactNode;
  content: React.ReactNode;
}

export const Disclosure: React.FC<DisclosureProps> = ({ buttonText, content }) => {
  return (
    <HeadlessDisclosure>
      {({ open }) => (
        <>
          <DisclosureButton className={'flex justify-between items-center w-full'}>
            {buttonText}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={classnames('text-gray-500 mr-5 h-5', { 'transform rotate-180': open })}
            />
          </DisclosureButton>
          <DisclosurePanel className='text-gray-500'>{content}</DisclosurePanel>
        </>
      )}
    </HeadlessDisclosure>
  );
};
