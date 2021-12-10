import { useEffect } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { EmploymentTypes, SkillInformationDTO } from '@ehpr/common';

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
} from '@components';

import {
  SubmissionType,
  registrationStatusOptions,
  healthAuthorityOptions,
  notEmployedReasonOptions,
  employmentOptions,
  streamOptions,
  getSpecialtyOptions,
  getSubspecialtyOptions,
} from '../validation';

import { defaultSpecialtyValue } from '../validation/credential';

export const Credential: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<SubmissionType>();
  const { stream, specialties, currentEmployment }: SkillInformationDTO = values.skillInformation;

  const selectedSpecialties = specialties.map(specialty => specialty.name);

  const specialtyOptions = stream ? getSpecialtyOptions(stream) : null;

  const subspecialties = selectedSpecialties
    ? getSubspecialtyOptions(stream, selectedSpecialties)
    : null;

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

  return (
    <div className='flex flex-col gap-5'>
      <FormStepHeader>3. Credential Information</FormStepHeader>
      <Select
        name='skillInformation.stream'
        label='Stream Type'
        description='If your current employment are both full time employment and student, please select the stream that you want to volunteer'
      >
        {streamOptions.map(stream => (
          <Option key={stream.value} label={stream.label} value={stream.value} />
        ))}
      </Select>

      <Radio
        name='skillInformation.registrationStatus'
        legend='Please select which best applied to your current registration status'
        options={registrationStatusOptions}
      />

      <Field
        name='skillInformation.registrationNumber'
        label='Please indicate registration number from your credentialing body'
      />

      <Radio
        name='skillInformation.currentEmployment'
        legend='Please select which best applied to your current employment'
        options={employmentOptions}
      />

      <div className='flex flex-col items-start'>
        <FieldArray
          name='skillInformation.specialties'
          render={arrayHelpers => (
            <>
              {specialties?.map((_, index) => (
                <SpecialtySelector
                  key={index}
                  disabled={!specialtyOptions}
                  index={index}
                  specialties={specialtyOptions}
                  subspecialties={subspecialties?.[index]}
                />
              ))}
              <div className='flex items-center'>
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

      {isHealthAuthorityEmployed ? (
        <CheckboxArray
          name='skillInformation.healthAuthorities'
          legend='Please indicate which Health Authority (select all the apply):'
          options={healthAuthorityOptions}
        />
      ) : null}

      {isNotHealthAuthorityEmployed ? (
        <Radio
          name='skillInformation.notEmployedReason'
          legend='<new question coming>'
          options={notEmployedReasonOptions}
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
            <p>Other specialty information not captured above.</p>
            <p>
              State your role title if you selected &apos;Non-Clinical Health Authority
              Employee&apos; above
            </p>
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

  const specialtyOptionIsDisabled = (name: string): boolean =>
    !!formSpecialties.find(specialty => specialty.name === name);

  return (
    <div className='grid grid-cols-2 gap-2 w-full'>
      <div className='col-span-1'>
        <Select
          name={`skillInformation.specialties[${index}].name`}
          label='Main Speciality'
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
          label='Subspecialty/Training'
          name={`skillInformation.specialties[${index}].subspecialties`}
          disabled={!subspecialties}
          options={subspecialties || []}
        />
      </div>
    </div>
  );
};
