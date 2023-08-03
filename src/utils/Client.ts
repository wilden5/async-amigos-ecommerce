import {
//   ApiRoot,
  ClientResponse,
  ProductPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: 'asdfadfsdfgsg' });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = (): Promise<ClientResponse<Project>> => apiRoot
    .get()
    .execute();

export const queryProducts = (): Promise<ClientResponse<ProductPagedQueryResponse>> => apiRoot
    .products()
    .get()
    .execute();