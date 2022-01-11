import { useEffect, useRef } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import {
  EmploymentTypes,
  RegistrationStatus,
  streamsById,
  SkillInformationDTO,
} from '@ehpr/common';

import {
  FormStepHeader,
  MultiSelect,
  Option,
  Select,
  CheckboxArray,
  Radio,
  Field,
  OptionType,
  Error,
} from '@components';

import {
  SubmissionType,
  registrationStatusOptions,
  healthAuthorityOptions,
  employmentCircumstanceOptions,
  employmentOptions,
  streamOptions,
  getSpecialtyOptions,
  getSubspecialtyOptions,
} from '../validation';

import { defaultSpecialtyValue } from '../validation/credential';

export const Credential: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<SubmissionType>();

  const { stream, specialties, currentEmployment, registrationStatus }: SkillInformationDTO =
    values.skillInformation;
  const selectedSpecialties = specialties.map(specialty => specialty.id);

  const specialtyOptions = stream ? getSpecialtyOptions(stream) : null;

  const subspecialties = selectedSpecialties ? getSubspecialtyOptions(selectedSpecialties) : null;

  const previousStream = useRef(stream);
  const previousCurrentEmployment = useRef(currentEmployment);
  // reset specialties if stream changes
  useEffect(() => {
    if (stream !== previousStream.current) {
      setFieldValue('skillInformation.specialties', [defaultSpecialtyValue]);
      setFieldValue('skillInformation.nonClinicalJobTitle', undefined);
      if (stream === streamsById.Nonclinical.id) {
        setFieldValue('skillInformation.specialties', []);
      }
    }
  }, [setFieldValue, stream]);

  // reset health authority/employment circumstance if employment status changes
  useEffect(() => {
    if (currentEmployment !== previousCurrentEmployment.current) {
      setFieldValue('skillInformation.healthAuthorities', []);

      setFieldValue('skillInformation.employmentCircumstance', null);
    }
  }, [setFieldValue, currentEmployment]);

  // reset registraion number if registation status changes to unregistered
  useEffect(() => {
    if (![RegistrationStatus.REGISTERED, RegistrationStatus.TEMP].includes(registrationStatus)) {
      setFieldValue('skillInformation.registrationNumber', undefined);
    }
  }, [setFieldValue, registrationStatus]);

  const isRegistered = [RegistrationStatus.REGISTERED, RegistrationStatus.TEMP].includes(
    registrationStatus,
  );

  const specialtySelectorEnabled = specialtyOptions && specialtyOptions?.length > 1;

  const isNonClinical = stream === streamsById.Nonclinical.id;
  const isClinical = stream && !isNonClinical; // stream is selected and is not non-clinical
  return (
    <div className='flex flex-col gap-5'>
      <FormStepHeader>3. Credentials Information</FormStepHeader>
      <Select name='skillInformation.stream' label='Stream Type' cyData={'stream'}>
        {streamOptions.map(stream => (
          <Option key={stream.value} label={stream.label} value={stream.value} />
        ))}
      </Select>

      {isNonClinical ? (
        <Field name='skillInformation.nonClinicalJobTitle' label={`Provide your job title`} />
      ) : null}

      {isClinical ? (
        <div className='flex flex-col items-start'>
          <FieldArray
            name='skillInformation.specialties'
            render={arrayHelpers => (
              <>
                <fieldset className='flex flex-col w-full gap-8 mb-4'>
                  <legend className='font-semibold mb-4'>Select your specialties</legend>
                  {specialties?.map((_, index) => (
                    <SpecialtySelector
                      key={index}
                      disabled={!specialtySelectorEnabled}
                      index={index}
                      specialties={specialtyOptions}
                      subspecialties={subspecialties?.[index]}
                      cyData={'specialty'}
                    />
                  ))}
                </fieldset>

                <div className='mb-2'>
                  <Error name='skillInformation.specialties' />
                </div>

                <div className='flex justify-center md:justify-start items-center w-full'>
                  {specialties.length !== specialtyOptions?.length && specialtySelectorEnabled ? (
                    <button
                      type='button'
                      className='text-bcBlueLink'
                      aria-label='add another specialty'
                      onClick={() => arrayHelpers.push({ ...defaultSpecialtyValue })}
                    >
                      Add
                    </button>
                  ) : null}
                  {specialties.length > 1 && specialties.length !== specialtyOptions?.length ? (
                    <span aria-hidden className='text-sm mx-1'>
                      |
                    </span>
                  ) : null}
                  {specialties.length > 1 ? (
                    <button
                      type='button'
                      className='text-bcRedError'
                      aria-label='delete the last specialty'
                      onClick={() => arrayHelpers.pop()}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </>
            )}
            data-cy={'specialty'}
          />
        </div>
      ) : null}
      <Radio
        name='skillInformation.registrationStatus'
        legend='Select which best applies to your current registration status'
        options={registrationStatusOptions}
      />
      {isRegistered ? (
        <Field
          name='skillInformation.registrationNumber'
          label='Indicate your registration number from your credentialing body (optional)'
        />
      ) : null}
      <Radio
        name='skillInformation.currentEmployment'
        legend='Select which best applies to your current employment status'
        options={employmentOptions}
        cy-data={'skillinformation'}
      />

      <SecondaryEmploymentQuestion employmentStatus={currentEmployment} />
    </div>
  );
};

interface SpecialtySelectorProps {
  disabled: boolean;
  index: number;
  specialties: OptionType[] | null;
  subspecialties?: OptionType[] | null;
  cyData?: string;
}

const SpecialtySelector: React.FC<SpecialtySelectorProps> = ({
  disabled,
  index,
  specialties,
  subspecialties,
  cyData,
}) => {
  const { values } = useFormikContext<SubmissionType>();
  const { specialties: formSpecialties }: SkillInformationDTO = values.skillInformation;

  const specialtyOptionIsDisabled = (specialtyId: string): boolean =>
    !!formSpecialties.find(specialty => specialty.id === specialtyId);
  return (
    <div className='grid md:grid-cols-2 gap-2 w-full ring-gray-200 ring-1 ring-offset-10 rounded-sm'>
      <div className='col-span-1'>
        <Select
          name={`skillInformation.specialties[${index}].id`}
          label={`Main Speciality #${index + 1}`}
          disabled={disabled}
          cyData={cyData}
        >
          {specialties?.map((specialty, index) => (
            <Option
              key={`${specialty.value}${index}`}
              label={specialty.label}
              value={specialty.value}
              disabled={specialtyOptionIsDisabled(specialty.value)}
            />
          ))}
        </Select>
      </div>
      <div className='col-span-1'>
        <MultiSelect
          label={`Subspecialty #${index + 1}`}
          name={`skillInformation.specialties[${index}].subspecialties`}
          disabled={!subspecialties || subspecialties.length === 0}
          options={subspecialties || []}
          cyData={'subspecialty'}
        />
      </div>
    </div>
  );
};

const SecondaryEmploymentQuestion: React.FC<{ employmentStatus: EmploymentTypes }> = ({
  employmentStatus,
}) => {
  switch (employmentStatus) {
    case EmploymentTypes.HEALTH_SECTOR_EMPLOYED:
      return (
        <CheckboxArray
          name='skillInformation.healthAuthorities'
          legend='Indicate where you are employed (select all that apply):'
          options={healthAuthorityOptions}
        />
      );
    case EmploymentTypes.HEALTH_SECTORY_RESIDENCY:
      return (
        <CheckboxArray
          name='skillInformation.healthAuthorities'
          legend='Indicate where you are doing your practicum/residency (select all that apply):'
          options={healthAuthorityOptions}
        />
      );
    case EmploymentTypes.NOT_HEALTH_SECTOR_EMPLOYED:
      return (
        <Radio
          name='skillInformation.employmentCircumstance'
          legend='Select your circumstance:'
          options={employmentCircumstanceOptions}
        />
      );
    default:
      return null;
  }
};
