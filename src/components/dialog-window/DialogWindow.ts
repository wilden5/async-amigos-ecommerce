import Component from '../templates/Component';
import DOMHelpers from '../../utils/DOMHelpers';
import Slider from '../slider/Slider';

class DialogWindow extends Component {
  private readonly dialogElement: HTMLDivElement;

  private readonly overlayElement: HTMLDivElement;

  private slider: Slider | null;

  constructor() {
    super('div', 'dialog-window');
    this.dialogElement = this.createDialogElement();
    this.overlayElement = this.createOverlayElement();
    this.slider = null;
  }

  private createDialogElement(): HTMLDivElement {
    const dialog = DOMHelpers.createElement('div', { className: 'dialog' }) as HTMLDivElement;
    dialog.innerHTML = `
      <div class="dialog-content">
        <div class="slider-container"></div>
        <button class="dialog-close">Close</button>
        <button class="dialog-close-window">Back to Catalog</button>
      </div>
    `;
    return dialog;
  }

  private createOverlayElement(): HTMLDivElement {
    return DOMHelpers.createElement('div', 'overlay') as HTMLDivElement;
  }

  private closeDialog(): void {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }

    if (document.body.contains(this.dialogElement)) {
      document.body.removeChild(this.dialogElement);
    }

    if (document.body.contains(this.overlayElement)) {
      document.body.removeChild(this.overlayElement);
    }
  }

  private closeDialogIfOverlayClicked(event: MouseEvent): void {
    if (event.target === this.overlayElement) {
      this.closeDialog();
    }
  }

  // TODO: these are the props for openProductImages (imageURLs: string[], productName: string)
  public openProductImages(): void {
    const sliderContainer = this.dialogElement.querySelector('.slider-container') as HTMLDivElement;
    if (sliderContainer) {
      this.slider = new Slider();
      sliderContainer.appendChild(this.slider.renderComponent());
    }

    document.body.appendChild(this.overlayElement);
    document.body.appendChild(this.dialogElement);
  }

  public renderComponent(): HTMLElement {
    return this.dialogElement;
  }
}

export default DialogWindow;
