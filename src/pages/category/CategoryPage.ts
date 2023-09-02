import page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class CategoryPage extends page {
  private readonly CATEGORY_PAGE_ID: string;

  private CATEGORY_PAGE_MARKUP = `
    <div class="category-container">
      <h1 class='page-title'>Category Page</h1>
    </div>`;

  constructor(pageId: string) {
    super(ProjectPages.Category);
    this.CATEGORY_PAGE_ID = pageId;
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATEGORY_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default CategoryPage;
