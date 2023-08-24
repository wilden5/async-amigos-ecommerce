import { Image, LocalizedString, Price, Product } from '@commercetools/platform-sdk';
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
      // TODO: rows down to 29 are for test purpose only and to be used in other methods ->
      const prodImg: Image[] | undefined = response.body.masterData.current.masterVariant.images;
      console.log(Object.values(prodImg!)[0].url);

      const description = response.body.masterData.current.description as LocalizedString;
      console.log(Object.values(description)[0]);

      const price: number[] | undefined = response.body.masterData.current.masterVariant.prices?.map(
        (v: Price) => v.value.centAmount / 100,
      );
      console.log(price![0], 'USD');
      // * <- eol

      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default QueryDetails;
