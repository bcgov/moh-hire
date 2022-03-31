## Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The app provides a registration form for health providers. It is a public service and there is no authentication. 

## Form page and data structure

Although it is a simple app with multistep form pages, the form data is a little complicated and the following data structure will help you understand the form pages.

**Pages**

Form page component for each step is defined in [steps](src/components/submission/index.tsx). 

- 1 - Primary
- 2 - Contact
- 3 - Credentials
- 4 - Preferences
- 5 - Review

**Data structure**

Each form page fills its property object of `SubmissionPayloadDTO`.

```typescript
class SubmissionPayloadDTO {
  personalInformation!: PersonalInformationDTO; /* page 1 */
  contactInformation!: ContactInformationDTO; /* page 2 */
  credentialInformation!: CredentialInformationDTO; /* page 3 */
  preferencesInformation!: PreferencesInformationDTO; /* page 4 */
}

class PersonalInformationDTO {
  firstName!: string;
  lastName!: string;
  postalCode!: string;
}


class ContactInformationDTO {
  primaryPhone!: string;
  primaryPhoneExt?: string;
  secondaryPhone?: string;
  secondaryPhoneExt?: string;
  email!: string;
}

class CredentialInformationDTO {
  stream!: StreamId;
  registrationStatus!: RegistrationStatus;
  registrationNumber?: string;
  currentEmployment!: EmploymentTypes;
  specialties!: SpecialtyDTO[];
  healthAuthorities?: HealthAuthorities[];
  employmentCircumstance?: EmploymentCircumstances;
  nonClinicalJobTitle?: string;
}

class SpecialtyDTO {
  id!: string;
  subspecialties?: SubspecialtyDTO[];
}
```

## Formik form and validation

One Formik form has five child pages and each page references the parent form using [useField](https://formik.org/docs/api/useField) or [useFormikContext](https://formik.org/docs/api/useFormikContext) hook.

Formik validates the fields with DTOs and [class-validator](https://github.com/typestack/class-validator) annotations.

## Tailwind CSS

It is a CSS framework, and you can easily customize its theme by editing [tailwind.config.js](tailwind.config.js)

## Running the app

Refer to [How to run the apps](../../README.md#how-to-run-the-apps).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test

Refer to [Tests](../../README.md#tests)

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
