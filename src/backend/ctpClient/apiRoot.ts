import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, projectKey } from './BuildClient';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
