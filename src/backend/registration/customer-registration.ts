import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

export class CustomerRegistration {
  private ctpClient: CtpClient;

  private readonly customerData: CustomerDraft;

  constructor(customerData: CustomerDraft) {
    this.ctpClient = new CtpClient();
    this.customerData = customerData;
  }

  async validateCustomerRegistration(customer: CustomerDraft): Promise<void> {
    const requiredFields = ['email', 'firstName', 'lastName', 'dateOfBirth', 'addresses'];

    if (requiredFields.some((fieldName) => !customer[fieldName as keyof CustomerDraft])) {
      throw new Error('All registration form fields must be filled!');
    }

    if (customer.firstName && /\d/.test(customer.firstName)) {
      throw new Error('First name field cannot have any digits or special symbols!');
    }

    if (customer.lastName && /\d/.test(customer.lastName)) {
      throw new Error('Last name field cannot have any digits or special symbols!');
    }

    if (customer.addresses) {
      if (
        customer.addresses.some(
          (address) => !address.streetName || !address.city || !address.postalCode || !address.country,
        )
      ) {
        throw new Error('All parts of an address must be filled!');
      }
    }
  }

  async createCustomer(): Promise<ClientResponse<CustomerSignInResult>> {
    if (this.customerData.email && this.customerData.password) {
      await this.validateCustomerRegistration(this.customerData);
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
