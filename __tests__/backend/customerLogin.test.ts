/* eslint-disable @typescript-eslint/dot-notation */
import { CustomerSignin } from "@commercetools/platform-sdk";
import { CtpClient } from "../../src/backend/ctpClient/ctpClient";
import { CustomerLogin } from "../../src/backend/login/customer-login";
// import { mocked } from "ts-jest/utils";


describe("CustomerLogin", () => {
  let customerLogin: CustomerLogin;
  let loginData: CustomerSignin;

  beforeEach(() => {
    loginData = {
      email: "test@test.com",
      password: "password123",
    };
    customerLogin = new CustomerLogin(loginData);
  });

  it("should be an instance of CustomerLogin", () => {
    expect(customerLogin).toBeInstanceOf(CustomerLogin);
  });

  it("should have a loginData property with the correct values", () => {
    expect(customerLogin['loginData']).toBeDefined();
    expect(customerLogin['loginData'].email).toEqual(loginData.email);
    expect(customerLogin['loginData'].password).toEqual(loginData.password);
  });

  it("should have a ctpClient property that is an instance of CtpClient", () => {
    expect(customerLogin.ctpClient).toBeDefined();
    expect(customerLogin.ctpClient).toBeInstanceOf(CtpClient);
  });

  describe("signIn", () => {
    it("should call the ctpClient withPasswordFlow method with the correct arguments", async () => {
      // mock the ctpClient withPasswordFlow method to return a fake response
      const mockResponse = { body: { customer: { id: "123" } } };
      const mockWithPasswordFlow = jest.fn().mockReturnValue({
        login: jest.fn().mockReturnValue({
          post: jest.fn().mockReturnValue({
            execute: jest.fn().mockResolvedValue(mockResponse),
          }),
        }),
      });
      // use the mocked function to replace the original one
      customerLogin.ctpClient.withPasswordFlow = mockWithPasswordFlow;
      // call the signIn method
      await customerLogin.signIn();
      // verify that the mock function was called with the correct arguments
      expect(mockWithPasswordFlow).toHaveBeenCalledWith(
        loginData.email,
        loginData.password
      );
    });

    it("should return a promise that resolves to a ClientResponse<CustomerSignInResult> object", async () => {
      // mock the ctpClient withPasswordFlow method to return a fake response
      const mockResponse = { body: { customer: { id: "123" } } };
      const mockWithPasswordFlow = jest.fn().mockReturnValue({
        login: jest.fn().mockReturnValue({
          post: jest.fn().mockReturnValue({
            execute: jest.fn().mockResolvedValue(mockResponse),
          }),
        }),
      });
      // use the mocked function to replace the original one
      customerLogin.ctpClient.withPasswordFlow = mockWithPasswordFlow;
      // call the signIn method and get the result
      const result = await customerLogin.signIn();
      // verify that the result is an object with a body property that matches the mock response
      expect(result).toBeDefined();
      expect(result.body).toEqual(mockResponse.body);
    });
  });
});
