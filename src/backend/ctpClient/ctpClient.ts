import fetch from 'cross-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { clientId, clientSecret, hostApi, hostAuth, projectKey, scopes } from '../configure/configure';

export class CtpClient {
  ctpClient: ClientBuilder;

  httpMiddlewareOptions: HttpMiddlewareOptions;

  constructor() {
    this.httpMiddlewareOptions = {
      host: hostApi,
      fetch,
    };
    this.ctpClient = new ClientBuilder().withProjectKey(projectKey).withHttpMiddleware(this.httpMiddlewareOptions);
    // .withLoggerMiddleware(); for dev usage
  }

  withPasswordFlow(email: string, password: string): ByProjectKeyRequestBuilder {
    const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: hostAuth,
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

    const newClient = this.ctpClient.withPasswordFlow(authMiddlewareOptions).build();

    const apiRootPassword = createApiBuilderFromCtpClient(newClient).withProjectKey({ projectKey });

    return apiRootPassword;
  }

  withClientCredentialsFlow(): ByProjectKeyRequestBuilder {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: hostAuth,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      fetch,
    };

    const newClient = this.ctpClient.withClientCredentialsFlow(authMiddlewareOptions).build();

    const apiRootCredentials = createApiBuilderFromCtpClient(newClient).withProjectKey({ projectKey });

    return apiRootCredentials;
  }

  withAnonymousSessionFlow(): ByProjectKeyRequestBuilder {
    const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
      host: hostAuth,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      fetch,
    };

    const newClient = this.ctpClient.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions).build();

    const apiRootAnonymous = createApiBuilderFromCtpClient(newClient).withProjectKey({ projectKey });

    return apiRootAnonymous;
  }
}
