abstract class Page {
  protected readonly CONTAINER: HTMLElement;

  static TextVariables = {};

  protected constructor(id: string) {
    this.CONTAINER = document.createElement('div');
    this.CONTAINER.id = id;
  }

  protected createHeaderTitle(text: string): HTMLElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  public render(): HTMLElement {
    return this.CONTAINER;
  }
}

export default Page;
