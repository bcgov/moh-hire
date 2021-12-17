import { FormStepHeader, Radio } from '@components';
import { FormStepProps } from '.';
import { yesNoOptions } from '../validation';

export const Preferences: React.FC<FormStepProps> = () => {
  return (
    <>
      <FormStepHeader>4. Employment Preferences</FormStepHeader>
      <Radio
        name='preferences.deployAnywhere'
        legend='Are you willing to deploy anywhere in BC?'
        options={yesNoOptions}
        horizontal
      />
    </>
  );
};
