import { CustomerSignin } from '@commercetools/platform-sdk';
import { CustomerLogin } from '../../src/backend/login/customer-login';

describe('CustomerLogin', () => {
    let customerLogin: CustomerLogin;
    let loginData: CustomerSignin;

    beforeEach(() => {
      loginData = {
        email: 'test@example.com',
        password: 'password',
      };
      customerLogin = new CustomerLogin(loginData);
    });

    it('should sign in a customer', async () => {
      const response = await customerLogin.signIn();
      expect(response.body.customer).toBeDefined();
    });
  });