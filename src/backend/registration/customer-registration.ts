import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

export class CustomerRegistration {
  private ctpClient: CtpClient;

  private customerData: CustomerDraft;

  constructor(customerData: CustomerDraft) {
    this.ctpClient = new CtpClient();
    this.customerData = customerData;
  }

  async createCustomer(): Promise<ClientResponse<CustomerSignInResult>> {
    if (this.customerData.email && this.customerData.password) {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .post({
          body: this.customerData,
        })
        .execute();
      return response;
    }
    throw new Error('Email or password is missing');
  }
}
