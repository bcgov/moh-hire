import React from 'react';
import { Field, FieldProps } from 'formik';
import ClickCaptcha from '../captcha/ClickCaptcha';

interface CaptchaFieldProps {
  name: string;
}

const CaptchaField: React.FC<CaptchaFieldProps> = ({ name }) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <ClickCaptcha
          onVerify={(isValid: boolean) => {
            form.setFieldValue(field.name, isValid);
          }}
        />
      )}
    </Field>
  );
};

export default CaptchaField;
