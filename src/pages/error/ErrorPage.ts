import Page from '../../components/templates/Page';
import { Errors } from '../../types/Enums';

class ErrorPage extends Page {
  private readonly errorType: Errors | string;

  static TextVariables: { [prop: string]: string } = {
    '404': 'Error! Page was not found',
  };

  constructor(id: string, errorType: Errors | string) {
    super(id);
    this.errorType = errorType;
  }

  public render(): HTMLElement {
    const title = this.createHeaderTitle(ErrorPage.TextVariables[this.errorType]);
    this.CONTAINER.append(title);
    return this.CONTAINER;
  }
}
export default ErrorPage;
