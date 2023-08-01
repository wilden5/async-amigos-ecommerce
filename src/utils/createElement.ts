export function createElement<T extends HTMLElement = HTMLElement>(
  tagName: keyof HTMLElementTagNameMap,
  properties: Partial<T>,
  parentElement: Element,
): T | HTMLElement {
  const element = document.createElement(tagName);
  parentElement?.append(element);
  return Object.assign(element, properties);
}
