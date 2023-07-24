const UpdateSubmissionHeader = () => {
  return (
    <>
      <div className='h-min w-full xl:w-layout mx-2 mb-2'>
        <p className='mb-4'>
          Please review the information below and update it as required. This ensures that your
          information remains accurate and that you can be contacted during emergency events.
        </p>
        <p className='mb-4'>When all the information is correct, please press “Submit”.</p>
        <p className='mb-4'>
          <u>If you no longer wish to participate</u> in the Emergency Health Provider Registry,
          <b>take no action on this page.</b> Registrants who do not update their information will
          be automatically removed from the registry. You may close this browser window.
        </p>
      </div>
    </>
  );
};

export default UpdateSubmissionHeader;
