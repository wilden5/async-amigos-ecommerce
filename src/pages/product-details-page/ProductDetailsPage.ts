import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class ProductDetailsPage extends Page {
  private PRODUCT_PAGE_MARKUP = `
     <h1 class='page-title'>Product page</h1>`;

  private PRODUCT_PAGE_ID: string;

  constructor(pageId: string) {
    super(ProjectPages.ProductDetails);
    this.PRODUCT_PAGE_ID = pageId;
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.PRODUCT_PAGE_MARKUP;
    return this.CONTAINER;
  }
}
export default ProductDetailsPage;
