/* eslint-disable @typescript-eslint/dot-notation */
import { CustomerSignin } from '@commercetools/platform-sdk';
import { CtpClient } from '../../src/backend/ctpClient/ctpClient';
import { CustomerLogin } from '../../src/backend/login/CustomerLogin';

describe('CustomerLogin', () => {
  let customerLogin: CustomerLogin;
  let loginData: CustomerSignin;

  beforeEach(() => {
    loginData = {
      email: 'test@test.com',
      password: 'password123',
    };
    customerLogin = new CustomerLogin(loginData);
  });

  it('should be an instance of CustomerLogin', () => {
    expect(customerLogin).toBeInstanceOf(CustomerLogin);
  });

  it('should have a loginData property with the correct values', () => {
    expect(customerLogin['loginData']).toBeDefined();
    expect(customerLogin['loginData'].email).toEqual(loginData.email);
    expect(customerLogin['loginData'].password).toEqual(loginData.password);
  });

  it('should have a ctpClient property that is an instance of CtpClient', () => {
    expect(customerLogin.ctpClient).toBeDefined();
    expect(customerLogin.ctpClient).toBeInstanceOf(CtpClient);
  });

  /* describe('signIn', () => {
    it('should call the ctpClient withPasswordFlow method with the correct arguments', async () => {
      const mockResponse = { body: { customer: { id: '123' } } };
      const mockWithPasswordFlow = jest.fn().mockReturnValue({
        login: jest.fn().mockReturnValue({
          post: jest.fn().mockReturnValue({
            execute: jest.fn().mockResolvedValue(mockResponse),
          }),
        }),
      });
      customerLogin.ctpClient.withPasswordFlow = mockWithPasswordFlow;
      await customerLogin.signIn();
      expect(mockWithPasswordFlow).toHaveBeenCalledWith(loginData.email, loginData.password);
    });

    it('should return a promise that resolves to a ClientResponse<CustomerSignInResult> object', async () => {
      const mockResponse = { body: { customer: { id: '123' } } };
      const mockWithPasswordFlow = jest.fn().mockReturnValue({
        login: jest.fn().mockReturnValue({
          post: jest.fn().mockReturnValue({
            execute: jest.fn().mockResolvedValue(mockResponse),
          }),
        }),
      });
      customerLogin.ctpClient.withPasswordFlow = mockWithPasswordFlow;
      const result = await customerLogin.signIn();
      expect(result).toBeDefined();
      expect(result.body).toEqual(mockResponse.body);
    });
  }); */
});
