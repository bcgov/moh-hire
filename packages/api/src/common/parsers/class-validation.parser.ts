/* eslint-disable @typescript-eslint/no-explicit-any */
import { FailedResponse } from '../ro/failed-response.ro';
import { ValidationError } from 'class-validator';
import { CommonError } from '../common.errors';

/**
 * Parse Class Validation related errors
 *
 * @export
 * @class ClassValidationParser
 */
export class ClassValidationParser {
  /**
   * Transform the array of class validator objects into
   * an array of error properties, and failed constraints
   *
   * @param errors: An array of class validator errors
   * @returns an object of { `property`: [`failed constraints of property` ...] }
   */
  static transformClassValidationErrors(errors: ValidationError[]): {
    [key: string]: string[];
  } {
    const errorObject: any = {};
    if (errors) {
      errors.forEach(error => {
        if (error.constraints) {
          return (errorObject[error.property] = Object.values(error.constraints));
        }
        appendConstraints(error.children, error.property);

        function appendConstraints(children: any[] | undefined, field: string) {
          children &&
            children.forEach(child => {
              if (child.constraints) {
                errorObject[field.concat('.' + child.property)] = Object.values(child.constraints);
                return;
              }
              appendConstraints(child.children, field.concat('.' + child.property));
            });
        }
      });
    }
    return errorObject;
  }

  /**
   * Transform a class validator exception to a `FailedResponse`
   *
   * @param exception: An exception caught by the handler
   * @returns A failed response object
   */
  static transformClassValidatorException(exception: Error): FailedResponse {
    const validationErrors: any = exception.message;
    return {
      errorType: CommonError.FAILED_FIELD_VALIDATION.errorType,
      errorMessage: CommonError.FAILED_FIELD_VALIDATION.errorMessage,
      errorDetails: ClassValidationParser.transformClassValidationErrors(validationErrors),
    };
  }

  /**
   * Examine the structure to see if the exception is a class validator exception
   *
   * @param exception: An exception caught by the filter
   * @returns conditional for whether to pass it through transformClassValidatorException
   */
  static isClassValidatorException(exception: Error): boolean {
    const exceptionMessage: any = exception.message;

    return typeof exceptionMessage === 'object' && exceptionMessage[0] instanceof ValidationError;
  }
}
