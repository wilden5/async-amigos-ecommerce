/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = '{projectKey}';
const scopes = ['{scope}'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.{region}.commercetools.com',
  projectKey,
  credentials: {
    clientId: '{clientID}',
    clientSecret: '{clientSecret}',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.{region}.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
