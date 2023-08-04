class DOMHelpers {
  static createElement<T extends HTMLElement = HTMLElement>(
    tagName: keyof HTMLElementTagNameMap,
    properties: Partial<T>,
    parentElement: Element,
  ): T | HTMLElement {
    const element = document.createElement(tagName);
    parentElement?.append(element);
    return Object.assign(element, properties);
  }

  static getElement<T extends HTMLElement>(selector: string): T {
    const element: T | null = document.querySelector(selector);
    if (element === null) {
      throw new Error(`Element with selector '${selector}' not found.`);
    }
    return element;
  }
}

export default DOMHelpers;
