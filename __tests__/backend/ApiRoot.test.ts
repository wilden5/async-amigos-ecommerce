import { ClientResponse, CustomerPagedQueryResponse } from "@commercetools/platform-sdk";
import { apiRoot } from "../../src/backend/ctpClient/apiRoot";

const queryCustomers = (): Promise<ClientResponse<CustomerPagedQueryResponse>> => apiRoot
      .customers()
      .get()
      .execute();

describe('getCustomers', () => {
  it('should return a Promise that resolves to a ClientResponse<CustomerPagedQueryResponse>', async () => {
    const result = await queryCustomers();
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(result).toHaveProperty('body');
  });
});
