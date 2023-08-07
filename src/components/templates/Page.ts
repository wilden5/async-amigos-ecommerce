import DOMHelpers from '../../utils/DOMHelpers';

abstract class Page {
  protected readonly CONTAINER: HTMLElement;

  protected constructor(className: string) {
    this.CONTAINER = DOMHelpers.createElement('div', { className });
  }

  public renderPage(): HTMLElement {
    return this.CONTAINER;
  }
}

export default Page;
