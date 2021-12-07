import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  Validator,
} from 'class-validator';
import { PersonalInformationDTO } from '.';
import { FormClass } from './form-class.dto';

const validator = new Validator();
export function ValidateNestedObject() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateNestedObject',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        async validate(value: FormClass, args: ValidationArguments) {
          const newValue = new FormClass(value);
          const result = await validator.validate(newValue as FormClass);
          console.log(JSON.stringify(result));
          return result.length === 0;
        },
      },
    });
  };
}

export function ValidateNestedObjectAgain() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateNestedObjectAgain',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        async validate(value: FormClass, args: ValidationArguments) {
          console.log(value);
          return true;
        },
      },
    });
  };
}
