import { Cart, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

class AnonymousCart {
  private CTP_CLIENT: CtpClient;

  constructor() {
    this.CTP_CLIENT = new CtpClient();
  }

  public async createCart(customerToken: string): Promise<Cart> {
    try {
      const response = await this.CTP_CLIENT.withAnonymousSessionFlow()
        .me()
        .carts()
        .post({
          headers: {
            Authorization: `${customerToken}`,
          },
          body: {
            currency: 'USD',
          },
        })
        .execute();
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getMyActiveCart(customerToken: string): Promise<CartPagedQueryResponse> {
    try {
      const response = await this.CTP_CLIENT.withAnonymousSessionFlow()
        .me()
        .carts()
        .get({
          headers: {
            Authorization: `${customerToken}`,
          },
        })
        .execute();
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AnonymousCart;
