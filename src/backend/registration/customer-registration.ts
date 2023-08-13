import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';
import Constants from '../../utils/Constants';

export class CustomerRegistration {
  private ctpClient: CtpClient;

  private readonly customerData: CustomerDraft;

  constructor(customerData: CustomerDraft) {
    this.ctpClient = new CtpClient();
    this.customerData = customerData;
  }

  async validateCustomerRegistration(customer: CustomerDraft): Promise<void> {
    if (Constants.REGISTRATION_REQUIRED_FIELDS.some((fieldName) => !customer[fieldName as keyof CustomerDraft])) {
      throw new Error(Constants.BACKEND_GENERIC_VALIDATION_MESSAGE_REGISTRATION);
    }

    if (customer.firstName && /\d/.test(customer.firstName)) {
      throw new Error(Constants.BACKEND_FIRST_NAME_VALIDATION_MESSAGE);
    }

    if (customer.lastName && /\d/.test(customer.lastName)) {
      throw new Error(Constants.BACKEND_LAST_NAME_VALIDATION_MESSAGE);
    }

    if (customer.addresses) {
      if (
        customer.addresses.some(
          (address) => !address.streetName || !address.city || !address.postalCode || !address.country,
        )
      ) {
        throw new Error(Constants.BACKEND_ADDRESS_VALIDATION_MESSAGE);
      }
    }
  }

  async createCustomer(): Promise<ClientResponse<CustomerSignInResult>> {
    try {
      await this.validateCustomerRegistration(this.customerData);
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
