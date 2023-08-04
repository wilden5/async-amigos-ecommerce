import Page from '../../components/templates/Page';

class MainPage extends Page {
  static TextVariables = {
    MainTitle: 'Main Page',
  };

  constructor(id: string) {
    super(id);
  }

  public render(): HTMLElement {
    const title = this.createHeaderTitle(MainPage.TextVariables.MainTitle);
    this.CONTAINER.append(title);
    return this.CONTAINER;
  }
}
export default MainPage;
