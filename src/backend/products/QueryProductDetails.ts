import { Product } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

class QueryDetails {
  private CTP_CLIENT: CtpClient;

  constructor() {
    this.CTP_CLIENT = new CtpClient();
  }

  public async queryProductDetails(productId: string): Promise<Product> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow()
        .products()
        .withId({ ID: `${productId}` })
        .get()
        .execute();

      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default QueryDetails;
