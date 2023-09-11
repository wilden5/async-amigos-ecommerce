import { ClientResponse, CustomerSignInResult, CustomerSignin } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';
import LoginValidator from './LoginValidator';
import Authorization from '../auth/Authorization';
import LocalStorage from '../../utils/LocalStorage';
import Constants from '../../utils/Constants';

export class CustomerLogin {
  private readonly loginData: CustomerSignin;

  private LOCAL_STORAGE: LocalStorage;

  public ctpClient: CtpClient;

  constructor(loginData: CustomerSignin) {
    this.ctpClient = new CtpClient();
    this.loginData = loginData;
    this.LOCAL_STORAGE = new LocalStorage();
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
        .me()
        .login()
        .post({
          headers: {
            Authorization: `${new LocalStorage().getLocalStorageItem(Constants.ACCESS_TOKEN_KEY) as string}`,
          },
          body: customerLogin,
        })
        .execute();
      if (response.statusCode === 200) {
        const customerToken = await new Authorization().requestCustomerTokenInfo(
          customerLogin.email,
          customerLogin.password,
        );
        this.LOCAL_STORAGE.setLocalStorageItem(
          Constants.ACCESS_TOKEN_KEY,
          `${customerToken.token_type as string} ${customerToken.access_token}`,
        );
        this.LOCAL_STORAGE.setLocalStorageItem(Constants.REFRESH_TOKEN_KEY, customerToken.refresh_token);
        this.LOCAL_STORAGE.setLocalStorageItem(
          Constants.EXPIRES_IN_TOKEN_KEY,
          `${new Date().getTime() + Number(customerToken.expires_in) * 1000}`,
        );
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
