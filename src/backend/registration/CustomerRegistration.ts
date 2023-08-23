import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';
import RegistrationValidator from './RegistrationValidator';

export class CustomerRegistration {
  private ctpClient: CtpClient;

  private readonly customerData: CustomerDraft;

  constructor(customerData: CustomerDraft) {
    this.ctpClient = new CtpClient();
    this.customerData = customerData;
  }

  async createCustomer(): Promise<ClientResponse<CustomerSignInResult>> {
    try {
      await RegistrationValidator.validateCustomerData(this.customerData);
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .post({
          body: this.customerData,
        })
        .execute();
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
