import {
//   ApiRoot,
  ClientResponse,
  Product,
  ProductPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyProductsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/products/by-project-key-products-request-builder';
import { ctpClient } from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: 'asdfadfsdfgsg' });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = (): Promise<ClientResponse<Project>> => apiRoot
    .get()
    .execute();

export const queryProduct = (productID: string): Promise<ClientResponse<Product>> => apiRoot
      .products()
      .withId({ ID: productID })
      .get()
      .execute();

const getEndPoint = (): ByProjectKeyProductsRequestBuilder => apiRoot.products()

export const getAllProducts = (): Promise<ClientResponse<ProductPagedQueryResponse>> => getEndPoint()
    .get()
    .execute();