import DOMHelpers from '../../src/utils/DOMHelpers';

describe('DOMHelpers', () => {
  it('should create a new element with given properties and append it to the parent', () => {
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
});
