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
    const authUrl = `${hostAuth}/oauth/${projectKey}/anonymous/token?grant_type=client_credentials&anonymous_id=denis-1234`;
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

  public async buildAuthString(): Promise<void> {
    if (!this.LOCAL_STORAGE.isLocalStorageItemExists('auth')) {
      const tokenInfo = await this.requestAnonymousTokenInfo();
      this.LOCAL_STORAGE.setLocalStorageItem('auth', `${tokenInfo.token_type as string} ${tokenInfo.access_token}`);
    }
  }
}
export default AnonymousSession;
