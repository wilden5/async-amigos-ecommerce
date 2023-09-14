import { Cart, DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';
import LocalStorage from '../../utils/LocalStorage';
import Constants from '../../utils/Constants';

class DiscountCodes {
  public CTP_CLIENT: CtpClient;

  private LOCAL_STORAGE: LocalStorage;

  constructor() {
    this.CTP_CLIENT = new CtpClient();
    this.LOCAL_STORAGE = new LocalStorage();
  }

  public async getDiscountCodes(): Promise<DiscountCodePagedQueryResponse> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow().discountCodes().get().execute();
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getDiscountCodeById(promoCode: string): Promise<Cart> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow()
        .me()
        .carts()
        .withId({
          ID: this.LOCAL_STORAGE.getLocalStorageItem(Constants.CART_ID_KEY) as string,
        })
        .post({
          body: {
            version: Number(this.LOCAL_STORAGE.getLocalStorageItem(Constants.CART_VERSION_KEY)),
            actions: [
              {
                action: 'addDiscountCode',
                code: `${promoCode}`,
              },
            ],
          },
        })
        .execute();
      console.log(response.body);
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default DiscountCodes;
