import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  Validator,
} from 'class-validator';
import { FormPayload } from './form-payload.dto';

const validator = new Validator();
export function IsValidForm(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateNestedObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: FormPayload, args: ValidationArguments) {
          const newValue = new FormPayload(value);
          const result = await validator.validate(newValue as FormPayload);
          // Todo: Add logging here
          return result.length === 0;
        },
      },
    });
  };
}
