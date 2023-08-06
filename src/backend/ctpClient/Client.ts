import {
  ClientResponse,
  Product,
  ProductPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyProductsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/products/by-project-key-products-request-builder';
import { ctpClient, projectKey } from './BuildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

export const getProject = (): Promise<ClientResponse<Project>> => apiRoot.get().execute();

export const queryProduct = (productID: string): Promise<ClientResponse<Product>> =>
  apiRoot.products().withId({ ID: productID }).get().execute();

const getEndPoint = (): ByProjectKeyProductsRequestBuilder => apiRoot.products();

export const getAllProducts = (): Promise<ClientResponse<ProductPagedQueryResponse>> => getEndPoint().get().execute();
