import { ClientResponse, CustomerSignInResult, CustomerSignin } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';
import LoginValidator from './LoginValidator';

export class CustomerLogin {
  private loginData: CustomerSignin;

  public ctpClient: CtpClient;

  constructor(loginData: CustomerSignin) {
    this.ctpClient = new CtpClient();
    this.loginData = loginData;
  }

  async signIn(): Promise<ClientResponse<CustomerSignInResult>> {
    try {
      await LoginValidator.validateCustomerData(this.loginData);
      const customerLogin: CustomerSignin = {
        email: this.loginData.email,
        password: this.loginData.password,
      };
      const response = await this.ctpClient
        .withPasswordFlow(this.loginData.email, this.loginData.password)
        .login()
        .post({
          body: customerLogin,
        })
        .execute();
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
