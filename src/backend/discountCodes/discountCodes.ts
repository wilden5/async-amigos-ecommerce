import { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import { CtpClient } from '../ctpClient/ctpClient';

class DiscountCodes {
  public CTP_CLIENT: CtpClient;

  constructor() {
    this.CTP_CLIENT = new CtpClient();
  }

  public async getDiscountCodes(): Promise<DiscountCodePagedQueryResponse> {
    try {
      const response = await this.CTP_CLIENT.withClientCredentialsFlow().discountCodes().get().execute();
      console.log(response.body);
      return response.body;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default DiscountCodes;
