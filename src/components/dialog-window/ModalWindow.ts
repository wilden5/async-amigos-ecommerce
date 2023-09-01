import Component from '../templates/Component';
import Constants from '../../utils/Constants';

class ModalWindow extends Component {
  private closeButton: HTMLElement;

  private modalContent: HTMLElement;

  constructor() {
    super('div', `${Constants.MODAL_WINDOW_CLASSNAME}`);

    this.CONTAINER.innerHTML = `
      <div class="modal-close">
        <span></span>
        <span></span>
      </div>
      <div class="${Constants.MODAL_CONTENT_CLASSNAME}"></div>
    `;

    this.closeButton = this.CONTAINER.querySelector('.modal-close') as HTMLElement;
    this.modalContent = this.CONTAINER.querySelector(`.${Constants.MODAL_CONTENT_CLASSNAME}`) as HTMLElement;

    this.closeButton.addEventListener('click', (): void => {
      this.close();
    });

    document.addEventListener('keydown', (event): void => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    this.CONTAINER.addEventListener('click', (event): void => {
      if (event.target === this.CONTAINER) {
        this.close();
      }
    });
  }

  public setContent(content?: HTMLElement): void {
    this.modalContent.innerHTML = '';
    if (content) {
      this.modalContent.appendChild(content);
    }
  }

  public open(): void {
    this.CONTAINER.style.display = 'block';
  }

  public close(): void {
    this.CONTAINER.style.display = 'none';
  }

  public renderComponent(): HTMLElement {
    return this.CONTAINER;
  }
}

export default ModalWindow;
