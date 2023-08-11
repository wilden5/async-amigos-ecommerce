/* eslint-disable no-console */
import './style.scss';
import { ClientResponse, CustomerDraft, CustomerSignInResult /* CustomerSignin */ } from '@commercetools/platform-sdk';
import App from './pages/app/App';
// import { CustomerLogin } from './backend/login/customer-login';
import { CustomerRegistration } from './backend/registration/customer-registration';
// import { CustomerLogin } from './backend/login/customer-login';

const APP = new App();

APP.init();

/* async function signInCustomer(): Promise<void> {
  const loginData: CustomerSignin = {
    email: 'test@example.com',
    password: 'password',
  };
  const customerLogin = new CustomerLogin(loginData);
  const response = await customerLogin.signIn();
  if (response.body.customer) {
    console.log('Sign in successful!');
  } else {
    console.log('Sign in failed.');
  }
}

signInCustomer().catch((error) => {
  console.error(error);
}); */

const customerData: CustomerDraft = {
  email: 'example666@gmail.com',
  password: 'examplePassword',
  firstName: 'Roberto',
  lastName: 'Carlos',
  dateOfBirth: '1990-01-01',
  addresses: [
    {
      streetName: 'Main Street',
      city: 'New York',
      postalCode: '10001',
      country: 'US',
    },
  ],
};
const customerRegistration = new CustomerRegistration(customerData);
customerRegistration
  .createCustomer()
  .then((response: ClientResponse<CustomerSignInResult>) => {
    console.log(response);
  })
  .catch((error: Error) => {
    console.error(error);
  });
