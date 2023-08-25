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
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default GetCustomerInfo;
