import './style.scss';
import App from './pages/app/App';

const APP = new App();

APP.init();

/* async function signInCustomer(): Promise<void> {
  const loginData: CustomerSignin = {
    email: 'example66643@gmail.com',
    password: 'examplePassword',
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

/* const customerData: CustomerDraft = {
  email: 'example66645@gmail.com',
  password: 'examplePassword',
  firstName: 'Roberto34348789798',
  lastName: 'Carlos343',
  dateOfBirth: '1990-01-01',
  addresses: [
    {
      streetName: 'Main Street',
      city: 'Minsk',
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
  }); */
