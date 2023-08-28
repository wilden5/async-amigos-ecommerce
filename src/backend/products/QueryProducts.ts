import { ProductPagedQueryResponse, ProductTypePagedQueryResponse } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

class QueryProducts {
  private CTP_CLIENT: CtpClient;

  constructor() {
    this.CTP_CLIENT = new CtpClient();
  }

  public async queryProductList(limit: number): Promise<ProductPagedQueryResponse> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow()
        .products()
        .get({ queryArgs: { limit } })
        .execute();
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async queryProductTypes(): Promise<ProductTypePagedQueryResponse> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow().productTypes().get().execute();
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default QueryProducts;
