import { registerDecorator, ValidationOptions, Validator } from 'class-validator';
import { FormPayloadDTO } from './form-payload.dto';

const validator = new Validator();
export function IsValidForm(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateNestedObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: FormPayloadDTO) {
          const newValue = new FormPayloadDTO(value);
          const result = await validator.validate(newValue as FormPayloadDTO);
          // Todo: Add logging here
          return result.length === 0;
        },
      },
    });
  };
}
