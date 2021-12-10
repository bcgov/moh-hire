import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SpecialtyDTO } from 'src';

@ValidatorConstraint({ name: 'specialties', async: false })
export class IsArrayOfSpecialties implements ValidatorConstraintInterface {
  validate(value: SpecialtyDTO[]) {
    if (value.length === 0) return false;

    for (const specialty of value) {
      // validate specialty name
      if (typeof specialty.name !== 'string' || specialty.name.length === 0) {
        return false;
      }

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
      console.log(
        '🚀 ~ file: is-array-of-specialties.decorator.ts ~ line 39 ~ IsArrayOfSpecialties ~ defaultMessage ~ specialty',
        specialty,
      );
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
