import { useEffect } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { EmploymentTypes, RegistrationStatus, SkillInformationDTO } from '@ehpr/common';

import {
  FormStepHeader,
  MultiSelect,
  Option,
  Select,
  CheckboxArray,
  Radio,
  Textarea,
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

  // reset specialties if stream changes
  useEffect(() => {
    setFieldValue('skillInformation.specialties', [defaultSpecialtyValue]);
  }, [setFieldValue, stream]);

  // reset health authority if employment changes
  useEffect(() => {
    setFieldValue('skillInformation.healthAuthorities', []);
  }, [setFieldValue, currentEmployment]);

  const isHealthAuthorityEmployed = [
    EmploymentTypes.HEALTH_SECTOR_EMPLOYED,
    EmploymentTypes.HEALTH_SECTORY_RESIDENCY,
  ].includes(currentEmployment);

  const isNotHealthAuthorityEmployed =
    currentEmployment === EmploymentTypes.NOT_HEALTH_SECTOR_EMPLOYED;

  const isRegistered = [RegistrationStatus.REGISTERED, RegistrationStatus.TEMP].includes(
    registrationStatus,
  );

  return (
    <div className='flex flex-col gap-5'>
      <FormStepHeader>3. Credential Information</FormStepHeader>
      <Select name='skillInformation.stream' label='Stream Type'>
        {streamOptions.map(stream => (
          <Option key={stream.value} label={stream.label} value={stream.value} />
        ))}
      </Select>

      {stream ? (
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
                      disabled={!specialtyOptions}
                      index={index}
                      specialties={specialtyOptions}
                      subspecialties={subspecialties?.[index]}
                    />
                  ))}
                </fieldset>

                <div className='mb-2'>
                  <Error name='skillInformation.specialties' />
                </div>

                <div className='flex justify-center md:justify-start items-center w-full'>
                  {specialties.length !== specialtyOptions?.length ? (
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
      />

      {isHealthAuthorityEmployed ? (
        <CheckboxArray
          name='skillInformation.healthAuthorities'
          legend='Please indicate which Health Authority (select all the apply):'
          options={healthAuthorityOptions}
        />
      ) : null}

      {isNotHealthAuthorityEmployed ? (
        <Radio
          name='skillInformation.employmentCircumstance'
          legend='Select your circumstance:'
          options={employmentCircumstanceOptions}
        />
      ) : null}

      <Textarea
        name='skillInformation.additionalComments'
        label={
          <p>
            Additional Comments (optional) <span className='sr-only'>50 characters max</span>
          </p>
        }
        maxLength={50}
        description={
          <>
            <p>Please provide any additional specialty information not captured above.</p>
            <p>If you selected &apos;Non-Clinical&apos;, please provide your job title.</p>
          </>
        }
      />
    </div>
  );
};

interface SpecialtySelectorProps {
  disabled: boolean;
  index: number;
  specialties: OptionType[] | null;
  subspecialties?: OptionType[] | null;
}

const SpecialtySelector: React.FC<SpecialtySelectorProps> = ({
  disabled,
  index,
  specialties,
  subspecialties,
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
          label={`Subspecialty/Training #${index + 1}`}
          name={`skillInformation.specialties[${index}].subspecialties`}
          disabled={!subspecialties || subspecialties.length === 0}
          options={subspecialties || []}
        />
      </div>
    </div>
  );
};
