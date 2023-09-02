import { BreadcrumbItem } from '../../types/Interfaces';
import DOMHelpers from '../../utils/DOMHelpers';

class Breadcrumbs {
  private static breadcrumbs: BreadcrumbItem[] = [];

  private static addBreadcrumb(label: string, url: string, level: number): void {
    const existingIndex = Breadcrumbs.breadcrumbs.findIndex((item) => item.level === level);

    if (existingIndex !== -1) {
      Breadcrumbs.breadcrumbs[existingIndex] = {
        label,
        url,
        level,
      };
    } else {
      Breadcrumbs.breadcrumbs.push({
        label,
        url,
        level,
      });
    }
  }

  private static removeBreadcrumbsAfterLevel(level: number): void {
    Breadcrumbs.breadcrumbs = Breadcrumbs.breadcrumbs.filter((item) => item.level === undefined || item.level <= level);
  }

  private static clearBreadcrumbs(): void {
    Breadcrumbs.breadcrumbs = [];
  }

  private static buildBreadcrumbs(container: HTMLElement): void {
    const breadcrumbContainer = container.querySelector('.breadcrumb') as HTMLDivElement;
    breadcrumbContainer.innerHTML = '';

    Breadcrumbs.breadcrumbs.forEach((item, index) => {
      const breadcrumbLink = DOMHelpers.createElement(
        'a',
        { className: 'bread-link', textContent: item.label },
        breadcrumbContainer,
      ) as HTMLAnchorElement;
      breadcrumbLink.href = item.url as string;

      if (index !== Breadcrumbs.breadcrumbs.length - 1) {
        const separator = DOMHelpers.createElement('span', { textContent: ' > ' });
        breadcrumbContainer.appendChild(separator);
      }
    });
  }

  static setCatalogBreadcrumb(container: HTMLElement): void {
    Breadcrumbs.clearBreadcrumbs();
    Breadcrumbs.addBreadcrumb('Catalog', '#catalog', 0);
    Breadcrumbs.buildBreadcrumbs(container);
  }

  static setCategoryBreadcrumb(container: HTMLElement, categoryLabel: string, categoryUrl: string): void {
    Breadcrumbs.removeBreadcrumbsAfterLevel(0);
    Breadcrumbs.addBreadcrumb('Catalog', '#catalog', 0);
    Breadcrumbs.addBreadcrumb(categoryLabel, categoryUrl, 1);
    Breadcrumbs.buildBreadcrumbs(container);
  }

  static setProductBreadcrumb(
    container: HTMLElement,
    categoryLabel: string,
    categoryUrl: string,
    productLabel: string,
    productUrl: string,
  ): void {
    Breadcrumbs.removeBreadcrumbsAfterLevel(1);
    Breadcrumbs.addBreadcrumb('Catalog', '#catalog', 0);
    Breadcrumbs.addBreadcrumb(categoryLabel, categoryUrl, 1);
    Breadcrumbs.addBreadcrumb(productLabel, productUrl, 2);
    Breadcrumbs.buildBreadcrumbs(container);
  }
}

export default Breadcrumbs;
