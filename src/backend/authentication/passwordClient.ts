import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { httpMiddlewareOptions, projectKey, scopes } from '../ctpClient/BuildClient';

export function createApiRootPassword(email: string, password: string): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: '05uAYgczsJrIx3uguiJM0Go-',
      clientSecret: 'eneEZtxyI08K96EiowFmlGv9gVQ1HCVC',
      user: {
        username: email,
        password,
      },
    },
    scopes,
    fetch,
  };

  const ctpClientPassword = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const apiRootPassword = createApiBuilderFromCtpClient(ctpClientPassword).withProjectKey({ projectKey });

  return apiRootPassword;
}
