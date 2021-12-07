import { registerDecorator, ValidationArguments, Validator } from 'class-validator';
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
          return result.length === 0;
        },
      },
    });
  };
}
