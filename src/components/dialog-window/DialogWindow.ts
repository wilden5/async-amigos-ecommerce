import { Price, Product } from '@commercetools/platform-sdk';
import QueryDetails from '../../backend/products/QueryProductDetails';

class DetailedProductDialog {
  private readonly dialogElement: HTMLDivElement;

  private readonly overlayElement: HTMLDivElement;

  constructor() {
    this.dialogElement = this.createDialogElement();
    this.overlayElement = this.createOverlayElement();
  }

  private createDialogElement(): HTMLDivElement {
    const dialog: HTMLDivElement = document.createElement('div');
    dialog.classList.add('dialog');
    dialog.innerHTML = `
      <div class="dialog-content">
        <h2 class="dialog-title">Dialog Title</h2>
        <img class="dialog-image" src="" alt="product-image">
        <p class="dialog-message">This is the dialog message</p>
        <p class="dialog-price">This is the dialog price</p>
        <button class="dialog-close">Close</button>
        <button class="dialog-close-window">Back to Catalog</button>
      </div>
    `;
    return dialog;
  }

  private createOverlayElement(): HTMLDivElement {
    const overlay: HTMLDivElement = document.createElement('div');
    overlay.classList.add('overlay');
    return overlay;
  }

  private closeDialog(): void {
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

  public openProductDetails(productId: string): void {
    const details = new QueryDetails();
    details
      .queryProductDetails(productId)
      .then((product: Product | null): void => {
        if (product) {
          const productName: string = product.masterData.current.name['en-US'];
          const productDescription: string | undefined = product.masterData.current.description?.['en-US'];
          const productPrice: number[] | undefined = product.masterData.current.masterVariant.prices?.map(
            (v: Price) => v.value.centAmount / 100,
          );
          const imageURL: string = product.masterData.current.masterVariant.images?.[0]?.url || '';

          const dialogTitle: Element | null = this.dialogElement.querySelector('.dialog-title');
          if (dialogTitle) {
            dialogTitle.textContent = productName;
          }

          const dialogPrice: Element | null = this.dialogElement.querySelector('.dialog-price');
          if (dialogPrice) {
            dialogPrice.textContent = productPrice ? `Price: ${productPrice.join(', ')} USD` : 'Price: N/A';
          }

          const dialogMessage: Element | null = this.dialogElement.querySelector('.dialog-message');
          if (dialogMessage) {
            dialogMessage.textContent = productDescription || '';
          }

          const dialogImage = this.dialogElement.querySelector('.dialog-image') as HTMLImageElement;
          if (dialogImage) {
            dialogImage.src = imageURL;
            dialogImage.alt = productName;
          }

          const dialogClose: Element | null = this.dialogElement.querySelector('.dialog-close');
          if (dialogClose) {
            dialogClose.addEventListener('click', (): void => {
              this.closeDialog();
            });
          }

          const dialogCloseWindow: Element | null = this.dialogElement.querySelector('.dialog-close-window');
          if (dialogCloseWindow) {
            dialogCloseWindow.addEventListener('click', (): void => {
              this.closeDialog();
            });
          }

          document.body.appendChild(this.overlayElement);
          document.body.appendChild(this.dialogElement);
        }
      })
      .catch((error: Error): void => {
        throw new Error('Error fetching product details:', error);
      });

    this.overlayElement.addEventListener('click', (event: MouseEvent): void => {
      this.closeDialogIfOverlayClicked(event);
    });

    this.dialogElement.addEventListener('click', (event: MouseEvent): void => {
      event.stopPropagation();
    });
  }
}

export default DetailedProductDialog;
