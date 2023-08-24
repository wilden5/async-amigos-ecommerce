import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

export class GetCustomerInfo {
  private customerId: string;

  public ctpClient: CtpClient;

  constructor(customerId: string) {
    this.ctpClient = new CtpClient();
    this.customerId = customerId;
  }

  async getProfileInfo(): Promise<ClientResponse<Customer>> {
    if (this.customerId === '') {
      return Promise.reject();
    }

    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .withId({ ID: this.customerId })
        .get()
        .execute();
      // eslint-disable-next-line no-console
      console.log(response);
      // eslint-disable-next-line no-console
      console.log({ ID: this.customerId });
      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error  getting  customer info:', error);
      return Promise.reject(error);
    }
  }
}

export default GetCustomerInfo;
