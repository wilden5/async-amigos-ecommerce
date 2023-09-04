import { TokenInfo } from '@commercetools/sdk-client-v2';
import { CtpClient } from '../ctpClient/ctpClient';
import {
  clientIdWithAnnonymousScope,
  clientSecretWithAnnonymousScope,
  hostAuth,
  projectKey,
} from '../configure/configure';
import LocalStorage from '../../utils/LocalStorage';

class AnonymousSession {
  private ctpClient: CtpClient;

  private LOCAL_STORAGE: LocalStorage;

  constructor() {
    this.ctpClient = new CtpClient();
    this.LOCAL_STORAGE = new LocalStorage();
  }

  public async requestAnonymousTokenInfo(): Promise<TokenInfo> {
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
    if (!this.LOCAL_STORAGE.isLocalStorageItemExists('access-token')) {
      const tokenInfo = await this.requestAnonymousTokenInfo();
      this.LOCAL_STORAGE.setLocalStorageItem(
        'access-token',
        `${tokenInfo.token_type as string} ${tokenInfo.access_token}`,
      );
      this.LOCAL_STORAGE.setLocalStorageItem('refresh-token', `${tokenInfo.refresh_token}`);
      this.LOCAL_STORAGE.setLocalStorageItem('expires-in', `${new Date().getTime() + 10800 * 1000}`);
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

  public async updateToken(): Promise<void> {
    const tokenExpirationTime = Number(localStorage.getItem('expires-in'));

    if (new Date().getTime() > tokenExpirationTime) {
      await this.refreshAccessToken(localStorage.getItem('refresh-token') as string);
      new LocalStorage().removeLocalStorageItem('access-token');
      await this.saveTokenInLocalStorage();
    }
  }
}
export default AnonymousSession;
