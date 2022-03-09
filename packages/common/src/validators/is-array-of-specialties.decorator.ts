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
import { CredentialInformationDTO, SubspecialtyDTO } from '../dto/credential-information.dto';

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
  if (!formSpecialties.find(formSpecialty => formSpecialty.id === specialty.id)) {
    return true;
  }
};

const subspecialtyNotListed = (subspecialty: SubspecialtyDTO, formSpecialties: Subspecialty[]) => {
  if (!formSpecialties.find(formSpecialty => formSpecialty.id === subspecialty.id)) {
    return true;
  }
};

@ValidatorConstraint({ name: 'specialties', async: false })
export class IsArrayOfSpecialties implements ValidatorConstraintInterface {
  private message = '';

  validate(value: SpecialtyDTO[], context: ValidationArguments) {
    const credentialInformationState = context.object as CredentialInformationDTO;
    // currently selected stream's specialties
    const formSpecialties = getSpecialtiesByStreamId(credentialInformationState.stream);

    if (formSpecialties.length === 0) {
      // specialty will be cleared before saving into database
      const hasSpecialty = value.some(v => v.id);
      if (hasSpecialty) {
        this.message = SpecialtyErrorEnum.INVALID_SPECIALTY;
      }
      return !hasSpecialty;
    }
    if (formSpecialties.length > 0 && value.length === 0) {
      this.message = SpecialtyErrorEnum.SPECIALTY_REQUIRED;
      return false;
    }

    for (const specialty of value) {
      // validate specialty.id is correct type
      if (!isValidString(specialty.id)) {
        this.message = SpecialtyErrorEnum.SPECIALTY_REQUIRED;
        return false;
      }
      // validate specialty is valid selection
      if (specialtyNotListed(specialty, formSpecialties)) {
        this.message = SpecialtyErrorEnum.INVALID_SPECIALTY;
        return false;
      }

      // don't validate subspecialties if they haven't been selected and aren't required by the specialty
      const formSubspecialties = getSubSpecialtiesBySpecialtyId(specialty.id);
      if (!formSubspecialties?.length) continue;

      // return false if specialty has subspecialties but none are selected
      if (!specialty.subspecialties?.length) {
        this.message = SpecialtyErrorEnum.SUBSPECIALTY_REQUIRED;
        return false;
      }

      for (const subspecialty of specialty.subspecialties) {
        // return false if subspecialties are not in the list of specialty's subspecialties
        if (subspecialtyNotListed(subspecialty, formSubspecialties)) {
          this.message = SpecialtyErrorEnum.INVALID_SUBSPECIALTY;
          return false;
        }
        // return false if the value is not a string
        if (!isValidString(subspecialty.id)) {
          this.message = SpecialtyErrorEnum.SUBSPECIALTY_REQUIRED;
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage() {
    return this.message;
  }
}
