abstract class Page {
  protected readonly CONTAINER: HTMLElement;

  protected constructor(id: string) {
    this.CONTAINER = document.createElement('div');
    this.CONTAINER.id = id;
  }

  public renderPage(): HTMLElement {
    return this.CONTAINER;
  }
}

export default Page;
