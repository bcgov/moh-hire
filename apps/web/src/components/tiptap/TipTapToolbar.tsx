import { useCallback, useState } from 'react';
import {
  faBold,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faRedo,
  faUnderline,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tiptap/react';
import { TipTapIcon } from './TipTapIcon';
import { HyperlinkInsert } from './HyperlinkInsert';

interface ToolbarProps {
  editor: Editor | null;
}

export const TipTapToolbar = (props: ToolbarProps) => {
  const { editor } = props;
  const [showHyperlinkInsert, setShowHyperlinkInsert] = useState(false);
  const [linkText, setLinkText] = useState('');

  const setLink = useCallback(() => {
    if (linkText === null) {
      return;
    }

    if (linkText === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: linkText }).run();

    hideInsertHyperlink();
  }, [editor, linkText]);

  // show hyper link input or unset existing hyperlink
  // this is able to determine separate parts of text and verify if it's currently an active hyperlink
  const showInsertHyperlink = () => {
    if (editor?.isActive('link')) {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      setLinkText('');
      return;
    }
    setShowHyperlinkInsert(true);
  };

  const hideInsertHyperlink = () => {
    setShowHyperlinkInsert(false);
    setLinkText('');
  };

  return (
    <>
      <div className='flex flex-row p-2 border border-b-0 border-black rounded-t-lg'>
        {/* Heading 1 */}
        <TipTapIcon
          type={{ name: 'heading', attributes: { level: 1 } }}
          editor={editor}
          text='H1'
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        {/* Heading 2 */}
        <TipTapIcon
          type={{ name: 'heading', attributes: { level: 2 } }}
          editor={editor}
          text='H2'
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        {/* Heading 3 */}
        <TipTapIcon
          type={{ name: 'heading', attributes: { level: 3 } }}
          editor={editor}
          text='H3'
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <span className='border-r-2 ml-1 mr-2'></span>
        {/* Bold */}
        <TipTapIcon
          type='bold'
          editor={editor}
          icon={faBold}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        {/* Italic */}
        <TipTapIcon
          type='italic'
          editor={editor}
          icon={faItalic}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        {/* Underline */}
        <TipTapIcon
          type='underline'
          editor={editor}
          icon={faUnderline}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        />
        {/* Bullet List - ul */}
        <TipTapIcon
          type='bulletList'
          editor={editor}
          icon={faListUl}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        {/* Ordered List - ol */}
        <TipTapIcon
          type='orderedList'
          editor={editor}
          icon={faListOl}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        {/* Hyperlink + text insert */}
        <div className='flex flex-col relative'>
          <TipTapIcon type='link' editor={editor} icon={faLink} onClick={showInsertHyperlink} />
          {showHyperlinkInsert && (
            <HyperlinkInsert
              close={hideInsertHyperlink}
              callback={setLink}
              linkText={linkText}
              setLinkText={setLinkText}
            />
          )}
        </div>
        <span className='border-r-2 ml-1 mr-2'></span>
        {/* Undo */}
        <TipTapIcon
          type='undo'
          editor={editor}
          icon={faUndo}
          onClick={() => editor?.chain().focus().undo().run()}
        />
        {/* Redo */}
        <TipTapIcon
          type='redo'
          editor={editor}
          icon={faRedo}
          onClick={() => editor?.chain().focus().redo().run()}
        />
      </div>
    </>
  );
};
