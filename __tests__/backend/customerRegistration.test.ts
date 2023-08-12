import { CustomerDraft } from '@commercetools/platform-sdk';
import { CustomerRegistration } from '../../src/backend/registration/customer-registration';

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
    };
    customerRegistration = new CustomerRegistration(customerData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a customer', async () => {
    const response = await customerRegistration.createCustomer();
    expect(response).toBeDefined();
    expect(response.body).toBeDefined();
  });

  it('should throw an error if email or password is missing', async () => {
    const newCustomerData = { ...customerData, email: '', password: '' };
    const newCustomerRegistration = new CustomerRegistration(newCustomerData);
    await expect(newCustomerRegistration.createCustomer()).rejects.toThrowError('Email or password is missing');
  });
});
