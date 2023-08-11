import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { hostApi } from "../../src/backend/configure/configure";
import { CtpClient } from "../../src/backend/ctpClient/ctpClient";

describe('CtpClient', () => {
  let ctpClient: CtpClient;

  beforeEach(() => {
    ctpClient = new CtpClient();
  });

  it('should be an instance of CtpClient', () => {
    expect(ctpClient).toBeInstanceOf(CtpClient);
  });

  it('should have a ctpClient property that is an instance of ClientBuilder', () => {
    expect(ctpClient.ctpClient).toBeDefined();
    expect(ctpClient.ctpClient).toBeInstanceOf(ClientBuilder);
  });

  it('should have a httpMiddlewareOptions property with the correct values', () => {
    expect(ctpClient.httpMiddlewareOptions).toBeDefined();
    expect(ctpClient.httpMiddlewareOptions.host).toEqual(hostApi);
    expect(ctpClient.httpMiddlewareOptions.fetch).toBeDefined();
  });

  describe('withPasswordFlow', () => {
    it('should return an instance of ByProjectKeyRequestBuilder', () => {
      const email = 'test@test.com';
      const password = 'password123';
      const result = ctpClient.withPasswordFlow(email, password);
      const byProjectKeyRequestBuilder = createApiBuilderFromCtpClient(result);
      expect(byProjectKeyRequestBuilder).toBeInstanceOf(byProjectKeyRequestBuilder.constructor);
    });
  });

  describe('withClientCredentialsFlow', () => {
    it('should return an instance of ByProjectKeyRequestBuilder', () => {
      const result = ctpClient.withClientCredentialsFlow();
      const byProjectKeyRequestBuilder = createApiBuilderFromCtpClient(result);
      expect(byProjectKeyRequestBuilder).toBeInstanceOf(byProjectKeyRequestBuilder.constructor);
    });
  });

  describe('withAnonymousSessionFlow', () => {
    it('should return an instance of ByProjectKeyRequestBuilder', () => {
      const result = ctpClient.withAnonymousSessionFlow();
      const byProjectKeyRequestBuilder = createApiBuilderFromCtpClient(result);
      expect(byProjectKeyRequestBuilder).toBeInstanceOf(byProjectKeyRequestBuilder.constructor);
    });
  });
});
