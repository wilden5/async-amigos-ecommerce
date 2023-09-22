import { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';
import LocalStorage from '../../utils/LocalStorage';

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
}

export default DiscountCodes;
