import {
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { CtpClient } from '../ctpClient/ctpClient';

class ProductProjectionSearch {
  private CTP_CLIENT: CtpClient;

  constructor() {
    this.CTP_CLIENT = new CtpClient();
  }

  public async filterProductCatalog(filterQuery?: string, limit = 50): Promise<ProductProjectionPagedSearchResponse> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow()
        .productProjections()
        .search()
        .get({
          queryArgs: { 'filter.query': filterQuery, 'limit': limit },
        })
        .execute();
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async sortProductCatalog(sort?: string, limit = 50): Promise<ProductProjectionPagedQueryResponse> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow()
        .productProjections()
        .get({
          queryArgs: { sort, limit },
        })
        .execute();
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ProductProjectionSearch;
