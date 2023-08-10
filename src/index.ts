/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import './style.scss';
import { CustomerDraft, CustomerSignin, ErrorResponse } from '@commercetools/platform-sdk';
import App from './pages/app/App';
import { CustomerAuth } from './backend/authentication/customer-auth';

const APP = new App();

APP.init();
// Создаем объект customerData с типом CustomerDraft
const customerData: CustomerDraft = {
  email: 'example2@gmail.com',
  password: 'examplePassword',
  firstName: 'Petr',
  lastName: 'Kanapelka',
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

const customer = new CustomerAuth(customerData.email, customerData.password!);

customer
  .createCustomer(customerData)
  .then(({ body }) => {
    console.log('customer22323', body);
  })
  .catch((error: ErrorResponse) => {
    if (error.statusCode === 400) {
      console.log('oshibka', error.message);
    } else {
      console.error(error);
    }
  });

// Создаем объект customerLogin с типом CustomerSignin
const customerLogin: CustomerSignin = {
  email: 'example@gmail.com',
  password: 'examplePassword',
};

customer
  .signIn(customerLogin)
  .then(({ body }) => {
    console.log('customer22323', body);
  })
  .catch((error: ErrorResponse) => {
    if (error.statusCode === 400) {
      console.log('oshibka', error.message);
    } else {
      console.error(error);
    }
  });
