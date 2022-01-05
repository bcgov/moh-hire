import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

export function ValidateArray(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidateArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any[]) {
          const acceptedValues: any[] = Object.values(validationOptions?.context.accepts);
          const invalidValues = value.filter((val: any) => {
            return !acceptedValues.includes(val);
          });

          return invalidValues.length === 0;
        },
        defaultMessage: (args: ValidationArguments) => {
          const { value } = args;
          const { accepts, name } = validationOptions?.context;
          const acceptedValues: any[] = Object.values(accepts);
          const invalidValues = value.filter((val: any) => {
            return !acceptedValues.includes(val);
          });
          return `Error validating ${name} array. Invalid values: ${JSON.stringify(invalidValues)}`;
        },
      },
    });
  };
}
