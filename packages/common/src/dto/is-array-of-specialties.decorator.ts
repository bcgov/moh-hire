import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SpecialtyDTO } from '../dto';
import {
  getSpecialtiesByStreamId,
  getSubSpecialtiesBySpecialtyId,
  Specialty,
  Subspecialty,
} from '../helper';
import { SkillInformationDTO, SubspecialtyDTO } from './skill-information.dto';

enum SpecialtyErrorEnum {
  SPECIALTY_REQUIRED = 'Specialty is required',
  INVALID_SPECIALTY = 'Invalid specialty selection',
  SUBSPECIALTY_REQUIRED = 'Subspecialty is required',
  INVALID_SUBSPECIALTY = 'Invalid subspecialty selection',
}

const isValidString = (string: string) => {
  if (typeof string === 'string' && string.length > 0) {
    return true;
  }
  return false;
};

const specialtyNotListed = (specialty: SpecialtyDTO, formSpecialties: Specialty[]) => {
  // validate specialty is including in selected stream specialty list
  if (!formSpecialties.find(formSpecialty => formSpecialty.id === specialty.name)) {
    return true;
  }
};

const subspecialtyNotListed = (subspecialty: SubspecialtyDTO, formSpecialties: Subspecialty[]) => {
  if (!formSpecialties.find(formSpecialty => formSpecialty.id === subspecialty.name)) {
    return true;
  }
};

@ValidatorConstraint({ name: 'specialties', async: false })
export class IsArrayOfSpecialties implements ValidatorConstraintInterface {
  validate(value: SpecialtyDTO[], context: ValidationArguments) {
    if (value.length === 0) return false;

    const skillInformationState = context.object as SkillInformationDTO;
    // currently selected stream's specialties
    const formSpecialties = getSpecialtiesByStreamId(skillInformationState.stream);

    for (const specialty of value) {
      // validate specialty.name is correct type
      if (!isValidString(specialty.name)) return false;
      // validate specialty is valid selection
      if (specialtyNotListed(specialty, formSpecialties)) return false;

      // don't validate subspecialties if they haven't been selected and aren't required by the specialty
      const formSubspecialties = getSubSpecialtiesBySpecialtyId(specialty.name);
      if (!formSubspecialties || formSubspecialties.length === 0) continue;

      // return false if specialty has subspecialties but none are selected
      if (!specialty.subspecialties || specialty.subspecialties?.length === 0) return false;

      for (const subspecialty of specialty.subspecialties) {
        // return false if subspecialties are not in the list of specialty's subspecialties
        if (subspecialtyNotListed(subspecialty, formSubspecialties)) return false;
        // return false if the value is not a string
        if (!isValidString(subspecialty.name)) {
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { value } = args;

    if (value.length === 0) return SpecialtyErrorEnum.SPECIALTY_REQUIRED;

    const skillInformationState = args.object as SkillInformationDTO;
    // currently selected stream's specialties
    const formSpecialties = getSpecialtiesByStreamId(skillInformationState.stream);

    for (const specialty of value) {
      if (!isValidString(specialty.name)) {
        return SpecialtyErrorEnum.SPECIALTY_REQUIRED;
      }
      if (specialtyNotListed(specialty, formSpecialties)) {
        return SpecialtyErrorEnum.INVALID_SPECIALTY;
      }

      // don't validate subspecialties if they haven't been selected and aren't required by the specialty
      const formSubspecialties = getSubSpecialtiesBySpecialtyId(specialty.name);
      if (!formSubspecialties || formSubspecialties.length === 0) continue;

      // check existance and length of subspecialties
      if (!specialty.subspecialties || specialty.subspecialties?.length === 0) {
        return SpecialtyErrorEnum.SUBSPECIALTY_REQUIRED;
      }

      for (const subspecialty of specialty.subspecialties) {
        if (!isValidString(subspecialty.name)) {
          return SpecialtyErrorEnum.SUBSPECIALTY_REQUIRED;
        }
        if (subspecialtyNotListed(subspecialty, formSpecialties)) {
          return SpecialtyErrorEnum.INVALID_SUBSPECIALTY;
        }
      }
    }

    return 'Invalid specialty selection';
  }
}
