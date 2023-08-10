import { AuthMiddlewareOptions, ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import fetch from 'cross-fetch';
import { clientId, clientSecret, host, projectKey, scopes } from '../configure/configure';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host,
  fetch,
};

export class CtpClient {
  ctpClient: ClientBuilder;

  constructor() {
    this.ctpClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware();
  }

  withPasswordFlow(email: string, password: string): ByProjectKeyRequestBuilder {
    const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user: {
          username: email,
          password,
        },
      },
      scopes,
      fetch,
    };

    this.ctpClient.withPasswordFlow(authMiddlewareOptions);

    const apiRootPassword = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });

    return apiRootPassword;
  }

  withClientCredentialsFlow(): ClientBuilder {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      fetch,
    };
    return this.ctpClient.withClientCredentialsFlow(authMiddlewareOptions);
  }
}
