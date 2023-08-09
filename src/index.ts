/* eslint-disable no-console */
import './style.scss';
import { ErrorResponse } from '@commercetools/platform-sdk';
import App from './pages/app/App';
import { CustomerAuth } from './backend/authentication/customer-auth';

const APP = new App();

APP.init();

const customer = new CustomerAuth('test@tut.by', 'sdsdasdasdad');

/* customer.createCustomer()
  .then(({ body }) => {
      console.log('customer22323', body);
  })
  .catch((error: ErrorResponse) => {
    if (error.statusCode === 400) {
      console.log('oshibka', error.message)
    } else {
      console.error(error);
    }
  }); */

/* customer.signIn()
    .then((response) => {
      console.log('resp', response)
    })
    .catch((error: ErrorResponse) => {
      if (error.statusCode === 400) {
        console.log('oshibka', error)
      } else {
        console.error(error);
      }
    }); */

customer
  .checkCustomerExists()
  .then((response) => {
    console.log('check', response);
  })
  .catch((error: ErrorResponse) => {
    if (error.statusCode === 400) {
      console.log('checkMistake', error);
    } else {
      console.error(error);
    }
  });
