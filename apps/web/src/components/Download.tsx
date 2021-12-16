/* eslint-disable @next/next/no-img-element */
export interface DownloadProps {
  ext: string;
  icon: string;
}

export const Download: React.FC<DownloadProps> = props => {
  const { ext, icon } = props;
  return (
    <>
      <button className='border-2 border-bcBluePrimary rounded py-3 px-8 w-full md:w-auto .align-middle'>
        <span className='inline-block mr-4 text-bcBluePrimary font-bold'>
          Download {ext.toUpperCase()}
        </span>
        <img src={icon} height='17' width='14' alt='download' />
      </button>
    </>
  );
};
