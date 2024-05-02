import { Fragment, useCallback, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { OptionType } from '@components';

export interface HeadlessListProps<T> {
  id: string;
  options: OptionType[];
  value: any;
  onChange: (value: T | T[]) => void;
  className?: string;
  isMulti?: boolean;
  menuPlacement?: 'bottom' | 'top';
  isDisabled?: boolean;
}

export const HeadlessList = ({
  id,
  options,
  value,
  onChange,
  className = '',
  isMulti = false,
  menuPlacement = 'bottom',
  isDisabled,
}: HeadlessListProps<string>) => {
  const getOption = useCallback(
    (value: string) => options.find(option => option.value === value),
    [options],
  );

  const displayText = useCallback(
    (value: string) => {
      const option = getOption(value);
      return (option?.label || option?.value || '').toString();
    },
    [getOption],
  );

  const displayMulti = useCallback(
    selectedValues => {
      return (
        <div className='flex flex-wrap'>
          {selectedValues
            .map((value: string) => getOption(value))
            .map((option: OptionType, index: number) => {
              return (
                <Fragment key={index}>
                  {option && (
                    <div className='text-sm bg-gray-300 rounded p-1 my-0.5 mr-1 truncate'>
                      {option?.label}
                    </div>
                  )}
                </Fragment>
              );
            })}
        </div>
      );
    },
    [getOption],
  );

  const [selected, setSelected] = useState<any>(value);

  const onListBoxChange = (value: any) => {
    setSelected(value);
    onChange(value);
  };
  const disabledStyles =
    isDisabled || options.length === 0 ? 'bg-gray-300 ' : 'border-b-2 border-black bg-gray-100';
  const heightStyle = selected && selected?.length != 0 ? '' : 'h-10';

  return (
    <div className={`w-full ${className}`}>
      <Listbox
        value={selected}
        onChange={onListBoxChange}
        multiple={isMulti}
        disabled={isDisabled || options?.length === 0}
      >
        <div className='relative mt-1'>
          <Listbox.Button
            placeholder='Select...'
            id={id}
            className={`${disabledStyles} ${heightStyle} relative w-full cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300`}
          >
            <span className='block truncate'>
              {isMulti ? displayMulti(selected) : displayText(selected)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 '>
              <FontAwesomeIcon
                icon={faCaretDown}
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className={`${
                menuPlacement === 'top' ? 'top-0 -translate-y-full' : ''
              } z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none`}
            >
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 ${isMulti ? 'pl-8' : 'pl-3'} pr-4 ${
                      active ? 'bg-gray-100' : 'text-gray-900'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span className='block truncate'>{option.label || option.value}</span>
                      {isMulti && selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                          <FontAwesomeIcon icon={faCheck} className='w-3 h-3' aria-hidden={true} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
