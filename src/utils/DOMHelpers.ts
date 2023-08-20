import Constants from './Constants';

class DOMHelpers {
  static createElement<T extends HTMLElement = HTMLElement>(
    tagName: string,
    properties: Partial<T>,
    parentElement?: Element,
  ): T | HTMLElement {
    const element = document.createElement(tagName);
    parentElement?.append(element);
    return Object.assign(element, properties);
  }

  static getElement<T extends HTMLElement>(classSelector: string): T {
    const element: T | null = document.querySelector(`.${classSelector}`);
    if (element === null) {
      throw new Error(`Element with selector '${classSelector}' not found.`);
    }
    return element;
  }

  static appendChildToElement<T extends HTMLElement>(parent: HTMLElement, child: T): void {
    parent.appendChild(child);
  }

  static showEnteredPassword(container: HTMLElement): void {
    const target = container.querySelector('.icon-lock') as HTMLSpanElement;
    const passwordInput = container.querySelector('.input-password') as HTMLInputElement;

    if (!passwordInput.value) {
      return;
    }

    if (passwordInput.type === 'password') {
      target.innerHTML = Constants.OPENED_LOCK_ICON_MARKUP;
      passwordInput.type = 'text';
    } else if (passwordInput.type === 'text') {
      target.innerHTML = Constants.CLOSED_LOCK_ICON_MARKUP;
      passwordInput.type = 'password';
    }
  }

  static showHeaderMenu(container: HTMLElement): void {
    const burgerBtn = container.querySelector('.header-container__burger') as HTMLButtonElement;
    const burgerMenu = container.querySelector('.navigation-bar') as HTMLElement;

    if (
      burgerBtn.closest('.header-container__item') ||
      burgerBtn.closest('.header-container.active') ||
      burgerBtn.closest('.header-container__burger')
    ) {
      setTimeout((): void => {
        if (burgerBtn && burgerMenu) {
          burgerBtn.classList.toggle('active');
          burgerMenu.classList.toggle('active');
          container.querySelector('body')?.classList.toggle('lock-scroll');
        }
      }, 300);
    }
  }
}

export default DOMHelpers;
