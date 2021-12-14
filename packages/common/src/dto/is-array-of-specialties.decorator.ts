import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SpecialtyDTO } from '../dto';
import { getSubSpecialtiesBySpecialtyId } from '../helper';

@ValidatorConstraint({ name: 'specialties', async: false })
export class IsArrayOfSpecialties implements ValidatorConstraintInterface {
  validate(value: SpecialtyDTO[]) {
    if (value.length === 0) return false;

    for (const specialty of value) {
      // validate specialty name
      if (typeof specialty.name !== 'string' || specialty.name.length === 0) {
        return false;
      }

      const subSpecialties = getSubSpecialtiesBySpecialtyId(specialty.name);
      const subspecialtyRequired = subSpecialties && subSpecialties.length > 0;
      if (!subspecialtyRequired) return true;

      if (!specialty.subspecialties || specialty.subspecialties?.length === 0) {
        return false;
      }
      // validate subspecialty names
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
