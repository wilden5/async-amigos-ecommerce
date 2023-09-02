import { BreadcrumbItem } from '../../types/Interfaces';
import DOMHelpers from '../../utils/DOMHelpers';

class Breadcrumbs {
  static breadcrumbs: BreadcrumbItem[] = [];

  static buildBreadcrumbs(container: HTMLElement): void {
    console.log(this.breadcrumbs);
    const breadcrumbContainer = container.querySelector('.breadcrumb') as HTMLDivElement;
    this.breadcrumbs.forEach((item) => {
      const breadcrumbLink = DOMHelpers.createElement(
        'a',
        { className: 'bread-link', textContent: item.label },
        breadcrumbContainer,
      ) as HTMLAnchorElement;
      if (item.url) {
        breadcrumbLink.href = item.url;
      }

      if (item !== this.breadcrumbs[this.breadcrumbs.length - 1]) {
        const separator = DOMHelpers.createElement('span', { textContent: ' > ' });
        breadcrumbContainer.appendChild(separator);
      }
    });
  }

  static addBreadcrumb(container: HTMLElement, label: string, url: string, level: number): void {
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

    const breadcrumbContainer = container.querySelector('.breadcrumb') as HTMLDivElement;
    breadcrumbContainer.innerHTML = '';
    this.buildBreadcrumbs(container);
  }
}

export default Breadcrumbs;
