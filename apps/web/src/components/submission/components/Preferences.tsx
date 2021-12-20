import {
  FormStepHeader,
  Radio,
  Disclosure,
  Checkbox,
  OptionType,
  Error,
  CheckboxArray,
} from '@components';
import { getLhasbyHaId, HaId } from '@ehpr/common';
import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';
import { FormStepProps } from '.';
import { SubmissionType } from '../validation';
import {
  deploymentDurationOptions,
  getHsdaOptions,
  getLhaOptions,
  haOptions,
  HaPdfSizeMap,
  placementOptions,
} from '../validation/preferences';

export const Preferences: React.FC<FormStepProps> = () => {
  const { values, setFieldValue } = useFormikContext<SubmissionType>();
  const { deployAnywhere } = values.availabilityInformation;

  const previousDeployAnywhere = useRef(deployAnywhere);

  useEffect(() => {
    // only reset locations when deploy anywhere is changed (i.e. changed from true to false)
    // prevents resetting locations on component mount
    if (deployAnywhere !== previousDeployAnywhere.current) {
      setFieldValue('availabilityInformation.deploymentLocations', []);
    }
    previousDeployAnywhere.current = deployAnywhere;
  }, [deployAnywhere, setFieldValue]);

  return (
    <div className='flex flex-col gap-4'>
      <FormStepHeader>4. Employment Preferences</FormStepHeader>
      <Radio.Boolean
        name='availabilityInformation.deployAnywhere'
        legend='Are you willing to deploy anywhere in BC?'
        horizontal
      />
      {deployAnywhere === false ? (
        <fieldset>
          <legend className='text-gray-500 font-bold mb-2 text-base'>
            Indicate the locations you are willing to support (click on the drop-down in each region
            and select the locations)
          </legend>
          <DeploymentLocationSelector />
          <Error name='availabilityInformation.deploymentLocations' />
        </fieldset>
      ) : null}
      <CheckboxArray
        legend='Indicate the placement option(s) you are willing to support'
        name='availabilityInformation.placementOptions'
        options={placementOptions}
      />
      <Radio.Boolean
        legend='Have you received immunization training in the past five years?'
        name='availabilityInformation.hasImmunizationTraining'
      />
      <Radio
        name='availabilityInformation.deploymentDuration'
        legend='Indicate the maximum duration of deployment you are willing to support'
        options={deploymentDurationOptions}
      />
    </div>
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
        <div key={value} className='bg-bcLightGray rounded mb-4'>
          <Disclosure
            buttonText={
              <span className='font-bold text-black p-5'>
                {label} (
                <a
                  href={HaPdfSizeMap[value].url}
                  target='_blank'
                  rel='noreferrer'
                  className='font-bold text-bcBlueLink'
                  aria-label={`${label} map PDF`}
                >
                  PDF, {HaPdfSizeMap[value].size}MB
                </a>
                )
              </span>
            }
            content={
              <div className='p-5 pt-0'>
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
                <div className='flex flex-col gap-5'>
                  {getHsdaOptions(value).map(({ value, label }) => (
                    <HsdaLocationSelector
                      key={value}
                      region={label}
                      lhaOptions={getLhaOptions(value)}
                    />
                  ))}
                </div>
              </div>
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
    <fieldset>
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
