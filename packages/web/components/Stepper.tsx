import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CheckProps {
  number: number;
  step: number;
}

const Check: React.FC<CheckProps> = ({ number, step }) => {
  return (
    <div
      className={`
      h-6 w-6 rounded-full border-2 border-bcBlueNav
      text-white
      flex flex-row items-center justify-center
      ${step >= number && 'bg-bcBlueNav'}`}
    >
      {number >= step ? (
        <span className='text-sm'>{number}</span>
      ) : (
        <FontAwesomeIcon icon={faCheck} className='h-3' />
      )}
    </div>
  );
};

interface StepProps {
  index: number;
  step: number;
  label: string;
  isLast: boolean;
}

const Step: React.FC<StepProps> = ({ index, step, label, isLast }) => {
  return (
    <div className='flex flex-col items-start'>
      <div aria-hidden className='flex justify-center items-center'>
        <Check number={index + 1} step={step} />
        {!isLast ? (
          <div className='flex-grow md:w-32 w-4 mx-2 border-t-2 border-bcBlueNav' />
        ) : null}
      </div>
      <p className='hidden md:block text-sm w-min text-gray-600 whitespace-nowrap'>{label}</p>
    </div>
  );
};

export const Stepper: React.FC<{ formSteps: string[]; step: number }> = ({ formSteps, step }) => {
  const stepCount = formSteps.length;
  return (
    <div
      aria-label={step <= stepCount ? `Form step ${step} of ${stepCount}` : 'Form Complete'}
      className='w-full flex justify-center print:hidden'
    >
      {formSteps.map((formStep, index) => (
        <Step index={index} step={step} label={formStep} isLast={stepCount === index + 1} />
      ))}
    </div>
  );
};
