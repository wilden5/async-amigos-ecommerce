abstract class Component {
  protected CONTAINER: HTMLElement;

  protected constructor(tagName: string, className: string) {
    this.CONTAINER = document.createElement(tagName);
    this.CONTAINER.className = className;
  }

  public render(): HTMLElement {
    return this.CONTAINER;
  }
}

export default Component;
