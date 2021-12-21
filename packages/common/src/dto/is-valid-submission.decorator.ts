import { registerDecorator, ValidationOptions, Validator } from 'class-validator';
import { SubmissionPayloadDTO } from './submission-payload.dto';

const validator = new Validator();
export function IsValidSubmission(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateNestedObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: SubmissionPayloadDTO) {
          const newValue = new SubmissionPayloadDTO(value);
          const result = await validator.validate(newValue as SubmissionPayloadDTO);
          // Todo: Add logging here
          return result.length === 0;
        },
      },
    });
  };
}
