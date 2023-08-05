import DOMHelpers from '../../utils/DOMHelpers';

abstract class Page {
  protected readonly CONTAINER: HTMLElement;

  protected constructor(id: string) {
    this.CONTAINER = DOMHelpers.createElement('div', { id });
  }

  public renderPage(): HTMLElement {
    return this.CONTAINER;
  }
}

export default Page;
