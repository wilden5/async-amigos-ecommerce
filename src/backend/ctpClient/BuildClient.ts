import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

export const projectKey = 'asdfadfsdfgsg';

const scopes = [
    'introspect_oauth_tokens:asdfadfsdfgsg',
    'manage_cart_discounts:asdfadfsdfgsg',
    'manage_discount_codes:asdfadfsdfgsg',
    'manage_my_payments:asdfadfsdfgsg',
    'create_anonymous_token:asdfadfsdfgsg',
    'manage_categories:asdfadfsdfgsg',
    'manage_products:asdfadfsdfgsg',
    'manage_my_orders:asdfadfsdfgsg',
    'manage_api_clients:asdfadfsdfgsg',
    'manage_customers:asdfadfsdfgsg'
];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'sR5xPbGSv6Wh_a4AUVEiIoRt',
    clientSecret: 'Lgx_dEmSpzV9pOMngvHxF71trSrBiwte',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com/',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
