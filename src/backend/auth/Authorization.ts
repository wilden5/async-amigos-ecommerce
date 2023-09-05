import { TokenInfo } from '@commercetools/sdk-client-v2';
import { CtpClient } from '../ctpClient/ctpClient';
import {
  clientIdWithAnnonymousScope,
  clientSecretWithAnnonymousScope,
  hostAuth,
  projectKey,
} from '../configure/configure';
import LocalStorage from '../../utils/LocalStorage';
import Constants from '../../utils/Constants';

class Authorization {
  private ctpClient: CtpClient;

  private LOCAL_STORAGE: LocalStorage;

  constructor() {
    this.ctpClient = new CtpClient();
    this.LOCAL_STORAGE = new LocalStorage();
  }

  public async requestNewAnonymousTokenInfo(): Promise<TokenInfo> {
    const authUrl = `${hostAuth}/oauth/${projectKey}/anonymous/token?grant_type=client_credentials`;
    const base64Credentials = btoa(`${clientIdWithAnnonymousScope}:${clientSecretWithAnnonymousScope}`);

    try {
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return (await response.json()) as TokenInfo;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async saveTokenInLocalStorage(): Promise<void> {
    if (!this.LOCAL_STORAGE.isLocalStorageItemExists(Constants.ACCESS_TOKEN_KEY)) {
      const tokenInfo = await this.requestNewAnonymousTokenInfo();
      this.LOCAL_STORAGE.setLocalStorageItem(
        Constants.ACCESS_TOKEN_KEY,
        `${tokenInfo.token_type as string} ${tokenInfo.access_token}`,
      );
      this.LOCAL_STORAGE.setLocalStorageItem(Constants.REFRESH_TOKEN_KEY, `${tokenInfo.refresh_token}`);
      this.LOCAL_STORAGE.setLocalStorageItem(
        Constants.EXPIRES_IN_TOKEN_KEY,
        `${new Date().getTime() + Number(tokenInfo.expires_in) * 1000}`,
      );
    }
  }

  public async refreshAccessToken(refreshToken: string): Promise<TokenInfo> {
    const authUrl = `${hostAuth}/oauth/token`;
    const base64Credentials = btoa(`${clientIdWithAnnonymousScope}:${clientSecretWithAnnonymousScope}`);
    try {
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
      });

      return (await response.json()) as TokenInfo;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async checkTokenExpirationDate(): Promise<void> {
    const tokenExpirationTime = Number(localStorage.getItem(Constants.EXPIRES_IN_TOKEN_KEY));

    if (new Date().getTime() > tokenExpirationTime) {
      this.LOCAL_STORAGE.removeLocalStorageItem(Constants.ACCESS_TOKEN_KEY);
      this.LOCAL_STORAGE.removeLocalStorageItem(Constants.EXPIRES_IN_TOKEN_KEY);

      const refreshedToken = await this.refreshAccessToken(
        this.LOCAL_STORAGE.getLocalStorageItem(Constants.REFRESH_TOKEN_KEY) as string,
      );
      this.LOCAL_STORAGE.setLocalStorageItem(
        Constants.ACCESS_TOKEN_KEY,
        `${refreshedToken.token_type as string} ${refreshedToken.access_token}`,
      );
      this.LOCAL_STORAGE.setLocalStorageItem(
        Constants.EXPIRES_IN_TOKEN_KEY,
        `${new Date().getTime() + Number(refreshedToken.expires_in) * 1000}`,
      );
    }
  }
}
export default Authorization;
