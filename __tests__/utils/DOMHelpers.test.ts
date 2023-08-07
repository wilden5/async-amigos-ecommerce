import DOMHelpers from '../../src/utils/DOMHelpers';

describe('DOMHelpers', () => {
  test('should create a new element with given properties and append it to the parent', () => {
    const tagName = 'div';
    const properties = {
      id: 'myDiv',
      className: 'my-class',
    };

    const parentElement = document.createElement('div');
    const element = DOMHelpers.createElement(tagName, properties, parentElement);

    expect(element.tagName).toBe(tagName.toUpperCase());
    expect(element.id).toBe(properties.id);
    expect(element.className).toBe(properties.className);
    expect(parentElement.contains(element)).toBe(true);
  });

  test('getElement should return the element when found', () => {
    const element = document.createElement('div');
    element.className = 'test-element';
    document.body.appendChild(element);

    const result = DOMHelpers.getElement('.test-element');

    expect(result).toBe(element);
  });

  test('appendChildToElement should add the child element to the parent', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');

    DOMHelpers.appendChildToElement(parent, child);

    expect(parent.contains(child)).toBe(true);
  });
});
