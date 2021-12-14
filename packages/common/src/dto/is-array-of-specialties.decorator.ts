import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SpecialtyDTO } from '../dto';
import { getSpecialtiesByStreamId, getSubSpecialtiesBySpecialtyId } from '../helper';
import { FormPayloadDTO } from './form-payload.dto';

@ValidatorConstraint({ name: 'specialties', async: false })
export class IsArrayOfSpecialties implements ValidatorConstraintInterface {
  validate(value: SpecialtyDTO[], context: ValidationArguments) {
    if (value.length === 0) return false;

    const formState = context.object as FormPayloadDTO['skillInformation'];
    // currently selected stream's specialties
    const formSpecialties = getSpecialtiesByStreamId(formState.stream);

    for (const specialty of value) {
      // validate specialty name
      if (typeof specialty.name !== 'string' || specialty.name.length === 0) {
        return false;
      }

      // validate specialty is including in selected stream specialty list
      if (!formSpecialties.find(formSpecialty => formSpecialty.id === specialty.name)) {
        return false;
      }

      // return true if specialty doesn't have subspecialties
      const subspecialties = getSubSpecialtiesBySpecialtyId(specialty.name);
      const subspecialtyRequired = subspecialties && subspecialties.length > 0;
      if (!subspecialtyRequired) return true;

      // return false if specialty has subspecialties but none are selected
      if (!specialty.subspecialties || specialty.subspecialties?.length === 0) {
        return false;
      }

      // return false if subspecialties are not in the list of specialty's subspecialties
      for (const subspecialty of specialty.subspecialties) {
        if (typeof subspecialty.name !== 'string' || subspecialty.name.length === 0) {
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { value } = args;

    if (value.length === 0) return 'Specialty is required';

    for (const specialty of value) {
      if (typeof specialty.name !== 'string' || specialty.name.length === 0) {
        return 'Specialty is required';
      }

      if (!specialty.subspecialties || specialty.subspecialties?.length === 0) {
        return 'Subspecialty is required';
      }

      for (const subspecialty of specialty.subspecialties) {
        if (typeof subspecialty.name !== 'string' || subspecialty.name.length === 0) {
          return 'Subspecialty is required';
        }
      }
    }

    return 'Invalid specialty selection';
  }
}
