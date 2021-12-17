import { FormStepHeader, Radio, Disclosure, Checkbox, OptionType } from '@components';
import { useFormikContext } from 'formik';
import { FormStepProps } from '.';
import { SubmissionType, yesNoOptions } from '../validation';

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
        <DeploymentLocationSelector />
      ) : null}
    </>
  );
};

const DeploymentLocationSelector: React.FC = () => {
  return (
    <fieldset>
      <legend className='text-gray-500 font-bold mb-2'>
        Indicate the locations you are willing to support (click on the drop-down in each region and
        select the locations)
      </legend>
      <div className='px-5 py-4 bg-bcLightGray rounded'>
        <Disclosure
          buttonText={
            <span className='font-bold text-black mb-4'>
              Fraser (<span className='font-bold text-bcBlueLink'>PDF, 1.4MB</span>)
            </span>
          }
          content={
            <>
              <LocationList
                region='Fraser East'
                locations={[
                  { label: 'Hope', value: 'hope' },
                  { label: 'Chilliwack', value: 'chilliwack' },
                  { label: 'Abotsford', value: 'abotsford' },
                  { label: 'Mission', value: 'mission' },
                  { label: 'Agassiz-Harrison', value: 'agassizHarrison' },
                ]}
              />
              <LocationList
                region='Fraser North'
                locations={[
                  { label: 'New Westminster', value: 'newWestminster' },
                  { label: 'Burnaby', value: 'burnaby' },
                  { label: 'Maple Ridge-Pitt Meadows', value: 'mapleRidgePittMeadows' },
                  { label: 'Tri-Cities', value: 'triCities' },
                ]}
              />
              <LocationList
                region='Fraser South'
                locations={[
                  { label: 'Langley', value: 'langley' },
                  { label: 'Delta', value: 'delta' },
                  { label: 'Surrey', value: 'surrey' },
                  { label: 'South Surrey - White Rock', value: 'southSurreyWhiteRock' },
                ]}
              />
            </>
          }
        ></Disclosure>
      </div>
    </fieldset>
  );
};

interface LocationListProps {
  region: string;
  locations: OptionType[];
}

const LocationList: React.FC<LocationListProps> = ({ region, locations }) => {
  return (
    <fieldset className='mb-5'>
      <legend className='font-bold text-black mb-2'>{region}</legend>
      <div className='grid grid-cols-2 gap-4 p-5 border border-gray-400 rounded text-black bg-white'>
        {locations.map(location => (
          <Checkbox
            key={location.value}
            name={`preferences`}
            value={location.value}
            label={location.label}
          />
        ))}
      </div>
    </fieldset>
  );
};
