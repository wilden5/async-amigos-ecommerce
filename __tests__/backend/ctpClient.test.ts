import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import fetch from 'cross-fetch';
import { CtpClient } from '../../src/backend/ctpClient/ctpClient';

jest.mock('@commercetools/platform-sdk');

const ctpClient = new CtpClient();

describe('CtpClient', () => {
  beforeEach(() => {
    jest.mock('@commercetools/sdk-client-v2', () =>
       ({
        ClientBuilder: jest.fn().mockImplementation(() => ({
          withProjectKey: jest.fn().mockReturnThis(),
          withHttpMiddleware: jest.fn().mockReturnThis(),
          withLoggerMiddleware: jest.fn().mockReturnThis(),
          withPasswordFlow: jest.fn().mockReturnThis(),
        })),
      })
    );
  });

  test('withPasswordFlow should return an apiRootPassword object', () => {
    const email = 'test@test.com';
    const password = 'test123';
    const apiRootPassword = {
      customers: jest.fn(),
      login: jest.fn(),
    };

    ClientBuilder.prototype.withPasswordFlow = jest.fn().mockImplementation((options) => {
      expect(options).toEqual({
        credentials: {
          clientId: '05uAYgczsJrIx3uguiJM0Go-',
          clientSecret: 'eneEZtxyI08K96EiowFmlGv9gVQ1HCVC',
          user: {
            username: email,
            password,
          },
        },
        fetch,
        host: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey: 'commercetools-api',
        scopes: [
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
        ],
      });
      return this;
    });

    (createApiBuilderFromCtpClient as jest.MockedFunction<typeof createApiBuilderFromCtpClient>).mockReturnValue({
      executeRequest: jest.fn(),
      baseUri: 'https://localhost',
      withProjectKey: jest.fn().mockReturnValue(apiRootPassword),
    } as unknown as ApiRoot);

    const result = ctpClient.withPasswordFlow(email, password);

    expect(result).toEqual(apiRootPassword);

    expect(createApiBuilderFromCtpClient).toHaveBeenCalledWith(
      expect.any(ClientBuilder)
    );
  });
});
