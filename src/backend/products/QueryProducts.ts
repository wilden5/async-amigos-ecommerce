import { ProductPagedQueryResponse, ProductTypePagedQueryResponse } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

class QueryProducts {
  private CTP_CLIENT: CtpClient;

  constructor() {
    this.CTP_CLIENT = new CtpClient();
  }

  public async queryProductList(pageNumber = 1, pageSize = 50): Promise<ProductPagedQueryResponse> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow()
        .products()
        .get({ queryArgs: { offset: (pageNumber - 1) * pageSize, limit: pageSize } })
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
