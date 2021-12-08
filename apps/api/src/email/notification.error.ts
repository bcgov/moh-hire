import { HttpStatus } from '@nestjs/common';
import { GenericError } from 'src/common/generic-exception';

export const EmailError = {
  FAILED_TO_SEND_EMAIL: {
    errorType: 'FAILED_TO_SEND_EMAIL',
    errorMessage: 'Failed to send email',
    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
  } as GenericError,
};
