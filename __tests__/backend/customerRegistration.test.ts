import { CustomerDraft } from '@commercetools/platform-sdk';
import { CustomerRegistration } from '../../src/backend/registration/CustomerRegistration';

const mockCtpClient = {
  withClientCredentialsFlow: jest.fn().mockReturnThis(),
  customers: jest.fn().mockReturnThis(),
  post: jest.fn().mockReturnThis(),
  execute: jest.fn().mockResolvedValue({ body: {} }),
};

jest.mock('../../src/backend/ctpClient/ctpClient', () => ({
  CtpClient: jest.fn().mockImplementation(() => mockCtpClient),
}));

describe('CustomerRegistration', () => {
  let customerData: CustomerDraft;
  let customerRegistration: CustomerRegistration;

  beforeEach(() => {
    customerData = {
      email: 'test@example.com',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
      dateOfBirth: '1970-01-01',
      addresses: [
        {
          streetName: 'test',
          city: 'Berlin',
          postalCode: '12345',
          country: 'US',
        },
      ],
    };
    customerRegistration = new CustomerRegistration(customerData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a customer', async () => {
    const response = await customerRegistration.createCustomer();
    expect(response).toBeDefined();
    expect(response.body).toBeDefined();
  });

  test('should throw an error if email is missing', async () => {
    const newCustomerData = { ...customerData, email: '' };
    const newCustomerRegistration = new CustomerRegistration(newCustomerData);
    await expect(newCustomerRegistration.createCustomer()).rejects.toThrowError('email field must be filled!');
  });

  test('should throw an error if password is missing', async () => {
    const newCustomerData = { ...customerData, password: '' };
    const newCustomerRegistration = new CustomerRegistration(newCustomerData);
    await expect(newCustomerRegistration.createCustomer()).rejects.toThrowError('password field must be filled!');
  });

  test('should throw an error if firstName is missing', async () => {
    const newCustomerData = { ...customerData, firstName: '' };
    const newCustomerRegistration = new CustomerRegistration(newCustomerData);
    await expect(newCustomerRegistration.createCustomer()).rejects.toThrowError('firstName field must be filled!');
  });

  test('should throw an error if lastName is contains digits', async () => {
    const newCustomerData = { ...customerData, lastName: '123' };
    const newCustomerRegistration = new CustomerRegistration(newCustomerData);
    await expect(newCustomerRegistration.createCustomer()).rejects.toThrowError(
      'Last name field cannot have any digits or special symbols!',
    );
  });

  test('should throw an error if part of address is missing', async () => {
    const testAddresses = [
      {
        streetName: 'test',
        city: '',
        postalCode: '12345',
        country: 'US',
      },
    ];
    const newCustomerData = { ...customerData, addresses: testAddresses };
    const newCustomerRegistration = new CustomerRegistration(newCustomerData);

    await expect(newCustomerRegistration.createCustomer()).rejects.toThrowError(
      'All parts of an address must be filled!',
    );
  });
});
