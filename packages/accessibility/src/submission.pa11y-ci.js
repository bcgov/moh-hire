const defaults = {
  timeout: 30000,
  standard: 'WCAG2AA',
  viewport: {
    width: 1300,
    height: 2000,
  },
};

const navActions = {
  personal: [
    'set field [name="personalInformation.firstName"] to John',
    'set field [name="personalInformation.lastName"] to Doe',
    'set field [name="personalInformation.postalCode"] to A1A1A1',
    'click button[type=submit]',
    'wait for path to be /submission/2',
  ],
  contact: [
    'set field [name="contactInformation.primaryPhone"] to 5874561234',
    'set field [name="contactInformation.email"] to test@test.io',
    'click button[type=submit]',
    'wait for path to be /submission/3',
  ],
  credential: ['click element #skillInformation.stream'],
};

const submitPage = 'click button[type=submit]';
const screenCap = fileName => `screen capture screenCaptures/${fileName}.png`;
const urls = [
  {
    url: 'http://localhost:3000/submission/1',
    actions: [
      submitPage, // trigger errors,
      screenCap('screencap_personal'),
    ],
  },
  {
    url: 'http://localhost:3000/submission/1',
    actions: [
      ...navActions.personal,
      submitPage, // trigger errors
      screenCap('screencap_contact'),
    ],
  },
  {
    url: 'http://localhost:3000/submission/1',
    actions: [
      ...navActions.personal,
      ...navActions.contact,
      submitPage, // trigger errors
      screenCap('screencap_credential'),
    ],
  },
];

module.exports = {
  defaults,
  urls,
};
