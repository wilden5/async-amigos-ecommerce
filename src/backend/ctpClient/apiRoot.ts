import { CtpClient } from './ctpClient';

export const apiRoot = {
  request: new CtpClient().withAnonymousSessionFlow(),
};
