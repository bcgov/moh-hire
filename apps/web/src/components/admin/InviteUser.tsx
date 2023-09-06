import { Button, Field, Modal, Select, Option, OptionType, selectStyleOverride } from '@components';
import { useState } from 'react';
import { InviteUserDTO, Role } from '@ehpr/common';
import { FieldProps, Form, Formik } from 'formik';
import { createValidator } from 'class-validator-formik';
import ReactSelect from 'react-select';

export const InviteUser = () => {
  const [open, setOpen] = useState(false);

  const initialValues: InviteUserDTO = {
    email: '',
    role: Role.User,
  };

  const roleOptions: OptionType[] = Object.values(Role).map(role => ({
    label: role.toUpperCase(),
    value: role,
  }));

  const handleSubmit = (values: InviteUserDTO) => {
    console.log(values);
  };

  const handleClose = () => {
    console.log('close');
    setOpen(false);
  };

  return (
    <div>
      <div className='mb-4'>
        <Button variant='outline' onClick={() => setOpen(true)}>
          Invite User
        </Button>
      </div>
      <Modal open={open} handleClose={handleClose}>
        <Modal.Title className='text-lg font-bold leading-6 text-bcBlueLink border-b p-4'>
          Invite a new user
        </Modal.Title>
        <div className='p-4'>
          <div className='pt-3 pb-4'>To invite a user, input an email and select a role.</div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={createValidator(InviteUserDTO)}
          >
            {() => (
              <Form>
                <div className='mb-4'>
                  <Field name='email' label='Email Address' type='email' />
                </div>
                <div className='mb-5 w-64'>
                  <Field
                    name='role'
                    label='User Role'
                    component={({ field, form }: FieldProps) => (
                      <ReactSelect<OptionType>
                        inputId={field.name}
                        value={roleOptions.find(o => o.value === field.value)}
                        onBlur={field.onBlur}
                        onChange={value => form.setFieldValue(field.name, value?.value)}
                        options={roleOptions}
                        styles={selectStyleOverride}
                        className='w-64 pointer-events-auto'
                      />
                    )}
                  />
                  {/*<Select label='User Role' name='role' className='w-64 pr-4'>*/}
                  {/*  {roleOptions.map(o => (*/}
                  {/*    <Option label={o.label} value={o.value} key={o.value} />*/}
                  {/*  ))}*/}
                  {/*</Select>*/}
                </div>
                <div className='text-right'>
                  <Button variant='primary' type='submit'>
                    Invite
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};
