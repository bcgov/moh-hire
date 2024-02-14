import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tiptap/react';
import _ from 'lodash';
import { MouseEventHandler } from 'react';

interface IconProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  editor: Editor | null;
  type: { name: string; attributes: { level: number } | undefined } | string;
  icon?: IconDefinition;
  text?: string;
}

export const TipTapIcon = (props: IconProps) => {
  const { type, editor, icon, onClick, text } = props;

  const isPlainText = typeof type === 'string';
  // some editor types have nested objects ie. heading levels
  const activeType = isPlainText
    ? editor?.isActive(type)
    : editor?.isActive(type.name, type.attributes);
  const title = isPlainText ? type : type.name;

  return (
    <button
      title={_.capitalize(title)}
      tabIndex={-1}
      onClick={onClick}
      className={`mr-1 h-8 w-8 border border-black rounded hover:bg-gray-200 capitalize ${
        activeType ? 'bg-gray-300' : ''
      }
      ${icon ? 'py-1 px-2' : ''}`}
    >
      {icon && <FontAwesomeIcon className='h-6 ' icon={icon}></FontAwesomeIcon>}
      {text && <span className='font-bold'>{text}</span>}
    </button>
  );
};
