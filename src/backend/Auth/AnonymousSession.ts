import { CtpClient } from '../ctpClient/ctpClient';
import {
  clientIdWithAnnonymousScope,
  clientSecretWithAnnonymousScope,
  hostAuth,
  projectKey,
} from '../configure/configure';

class AnonymousSession {
  private ctpClient: CtpClient;

  constructor() {
    this.ctpClient = new CtpClient();
  }

  public async requestAnonymousToken(): Promise<string> {
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
      return (await response.json()) as string;
    } catch (error) {
      console.error(error);
      return `Ошибка при запросе анонимного токена`;
    }
  }
}

export default AnonymousSession;
