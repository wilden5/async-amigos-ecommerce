import { ClientResponse, CustomerSignInResult, CustomerSignin } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { CtpClient } from '../ctpClient/ctpClient';
import LoginValidator from './LoginValidator';

export class CustomerLogin {
  private loginData: CustomerSignin;

  public ctpClient: CtpClient;

  private authApiRoot: ByProjectKeyRequestBuilder;

  constructor(loginData: CustomerSignin) {
    this.ctpClient = new CtpClient();
    this.loginData = loginData;
    this.authApiRoot = this.ctpClient.withPasswordFlow(this.loginData.email, this.loginData.password);
  }

  async signIn(): Promise<ClientResponse<CustomerSignInResult>> {
    try {
      await LoginValidator.validateCustomerData(this.loginData);
      const customerLogin: CustomerSignin = {
        email: this.loginData.email,
        password: this.loginData.password,
      };
      const response = await this.authApiRoot
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

  getApiRootWithToken(): ByProjectKeyRequestBuilder {
    return this.authApiRoot;
  }
}
