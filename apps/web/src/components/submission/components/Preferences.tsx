import { FormStepHeader, Radio, Disclosure, Checkbox, OptionType, Error } from '@components';
import { getLhasbyHaId, HaId } from '@ehpr/common';
import { useFormikContext } from 'formik';
import { FormStepProps } from '.';
import { SubmissionType, yesNoOptions } from '../validation';
import { getHsdaOptions, getLhaOptions, haOptions } from '../validation/preferences';

export const Preferences: React.FC<FormStepProps> = () => {
  const { values } = useFormikContext<SubmissionType>();

  return (
    <>
      <FormStepHeader>4. Employment Preferences</FormStepHeader>
      <Radio
        name='availabilityInformation.deployAnywhere'
        legend='Are you willing to deploy anywhere in BC?'
        options={yesNoOptions}
        horizontal
      />
      {(values.availabilityInformation?.deployAnywhere as any) === 'no' ? (
        <fieldset>
          <legend className='text-gray-500 font-bold mb-2 text-base'>
            Indicate the locations you are willing to support (click on the drop-down in each region
            and select the locations)
          </legend>
          <DeploymentLocationSelector />
          <Error name='availabilityInformation.deploymentLocations' />
        </fieldset>
      ) : null}
    </>
  );
};

const DeploymentLocationSelector: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<SubmissionType>();

  const selectedDeploymentLocations = values.availabilityInformation.deploymentLocations ?? [];

  const currentlySelected = (haId: HaId) => {
    const lhas = getLhasbyHaId(haId);

    return lhas.filter(lha =>
      values.availabilityInformation?.deploymentLocations?.includes(lha.id),
    );
  };

  const allSelected = (haId: HaId) => {
    const lhas = getLhasbyHaId(haId);
    return currentlySelected(haId).length === lhas.length;
  };
  const allUnselected = (haId: HaId) => currentlySelected(haId).length === 0;

  const unselectAll = (haId: string) => {
    const lhas = getLhasbyHaId(haId);
    const filtereredDeploymentLocations = selectedDeploymentLocations.filter(
      location => !lhas.find(lha => lha.id === location),
    );
    setFieldValue('availabilityInformation.deploymentLocations', filtereredDeploymentLocations);
  };

  const selectAll = (haId: HaId) => {
    const newDeploymentLocations = [...selectedDeploymentLocations];
    const lhas = getLhasbyHaId(haId);
    // add current locations if they aren't already selected
    lhas.forEach(lha => {
      if (!newDeploymentLocations.find(loc => loc === lha.id)) {
        newDeploymentLocations.push(lha.id);
      }
    });

    setFieldValue('availabilityInformation.deploymentLocations', newDeploymentLocations);
  };

  return (
    <div>
      {haOptions.map(({ value, label }) => (
        <div key={value} className='px-5 bg-bcLightGray rounded mb-4'>
          <Disclosure
            buttonText={
              <span className='font-bold text-black py-4'>
                {label} (<span className='font-bold text-bcBlueLink'>PDF, 1.4MB</span>)
              </span>
            }
            content={
              <>
                <div className='mb-2'>
                  <button
                    type='button'
                    onClick={() => selectAll(value)}
                    className='text-bcBlueLink disabled:text-gray-500 font-bold'
                    disabled={allSelected(value)}
                  >
                    Select all
                  </button>{' '}
                  |{' '}
                  <button
                    type='button'
                    onClick={() => unselectAll(value)}
                    className='text-bcBlueLink disabled:text-gray-500 font-bold'
                    disabled={allUnselected(value)}
                  >
                    Un-select all
                  </button>
                </div>
                {getHsdaOptions(value).map(({ value, label }) => (
                  <HsdaLocationSelector
                    key={value}
                    region={label}
                    lhaOptions={getLhaOptions(value)}
                  />
                ))}
              </>
            }
          />
        </div>
      ))}
    </div>
  );
};

interface LocationListProps {
  region: string;
  lhaOptions: OptionType[];
}

const HsdaLocationSelector: React.FC<LocationListProps> = ({ region, lhaOptions }) => {
  return (
    <fieldset className='mb-5'>
      <legend className='font-bold text-black mb-2 text-base'>{region}</legend>
      <div className='grid grid-cols-2 gap-4 p-5 border border-gray-400 rounded text-black bg-white'>
        {lhaOptions.map(location => (
          <Checkbox
            key={location.value}
            name={`availabilityInformation.deploymentLocations`}
            value={location.value}
            label={location.label}
          />
        ))}
      </div>
    </fieldset>
  );
};
