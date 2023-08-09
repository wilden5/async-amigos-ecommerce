import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const projectKey = 'commercetools-api';

export const scopes = [
  'manage_orders:commercetools-api',
  'manage_discount_codes:commercetools-api',
  'manage_my_profile:commercetools-api',
  'manage_my_payments:commercetools-api',
  'manage_api_clients:commercetools-api',
  'manage_customers:commercetools-api',
  'manage_categories:commercetools-api',
  'manage_my_orders:commercetools-api',
  'manage_cart_discounts:commercetools-api',
  'manage_products:commercetools-api',
];

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: '05uAYgczsJrIx3uguiJM0Go-',
    clientSecret: 'eneEZtxyI08K96EiowFmlGv9gVQ1HCVC',
  },
  scopes,
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com/',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
