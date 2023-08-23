import DOMHelpers from '../../utils/DOMHelpers';

abstract class Component {
  protected CONTAINER: HTMLElement;

  protected constructor(tagName: string, className: string) {
    this.CONTAINER = DOMHelpers.createElement(tagName, { className });
  }

  public renderComponent(): HTMLElement {
    return this.CONTAINER;
  }
}

export default Component;
