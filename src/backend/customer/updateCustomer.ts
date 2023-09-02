import { ClientResponse, Customer, CustomerUpdate, CustomerChangePassword } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

export class UpdateCustomerInfo {
  private customerId: string;

  public ctpClient: CtpClient;

  constructor(customerId: string) {
    this.ctpClient = new CtpClient();
    this.customerId = customerId;
  }

  async updateCustomerInfo(
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    version: number,
  ): Promise<ClientResponse<Customer>> {
    const actions: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setDateOfBirth',
          dateOfBirth,
        },
        {
          action: 'setLastName',
          lastName,
        },
        {
          action: 'setFirstName',
          firstName,
        },
        {
          action: 'changeEmail',
          email,
        },
      ],
    };
    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .withId({ ID: this.customerId })
        .post({
          body: actions,
        })
        .execute();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addCustomerAddress(
    country: string,
    city: string,
    streetName: string,
    postalCode: string,
    version: number,
  ): Promise<ClientResponse<Customer>> {
    const actions: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'addAddress',
          address: {
            country,
            city,
            streetName,
            postalCode,
          },
        },
      ],
    };
    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .withId({ ID: this.customerId })
        .post({
          body: actions,
        })
        .execute();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeCustomerAddress(addressId: string, version: number): Promise<ClientResponse<Customer>> {
    const actions: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'removeAddress',
          addressId,
        },
      ],
    };
    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .withId({ ID: this.customerId })
        .post({
          body: actions,
        })
        .execute();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async editCustomerAddress(
    country: string,
    city: string,
    streetName: string,
    postalCode: string,
    version: number,
  ): Promise<ClientResponse<Customer>> {
    const actions: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'changeAddress',
          address: {
            country,
            city,
            streetName,
            postalCode,
          },
        },
      ],
    };
    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .withId({ ID: this.customerId })
        .post({
          body: actions,
        })
        .execute();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async setDefaultBillingAddress(addressId: string, version: number): Promise<ClientResponse<Customer>> {
    const actions: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setDefaultBillingAddress',
          addressId,
        },
      ],
    };
    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .withId({ ID: this.customerId })
        .post({
          body: actions,
        })
        .execute();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async setDefaultShippingAddress(addressId: string, version: number): Promise<ClientResponse<Customer>> {
    const actions: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setDefaultShippingAddress',
          addressId,
        },
      ],
    };
    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .withId({ ID: this.customerId })
        .post({
          body: actions,
        })
        .execute();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async changeCustomerPassword(
    currentPassword: string,
    newPassword: string,
    version: number,
  ): Promise<ClientResponse<Customer>> {
    const customerUpdate: CustomerChangePassword = {
      id: this.customerId,
      version,
      currentPassword,
      newPassword,
    };
    try {
      const response = await this.ctpClient
        .withClientCredentialsFlow()
        .customers()
        .password()
        .post({
          body: customerUpdate,
        })
        .execute();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
