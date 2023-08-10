import NavigationBar from '../../../src/components/navigation-bar/NavigationBar';

describe('NavigationBar', () => {
  let navigationBar: NavigationBar;
  let actualComponentMarkup: HTMLElement;

  beforeEach(() => {
    navigationBar = new NavigationBar();

    const container = document.createElement('nav');
    container.className = 'navigation-bar';
    actualComponentMarkup = navigationBar.renderComponent();

    document.body.appendChild(container);
    container.appendChild(actualComponentMarkup);
  });

  afterEach(() => {
    const container = document.querySelector('.navigation-bar');
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('Login link should be present in Navigation Bar', () => {
    const element = actualComponentMarkup.querySelector('a[href="/#login"]');
    expect(element).not.toBeNull();
  });

  test('Registration link should be present in Navigation Bar', () => {
    const element = actualComponentMarkup.querySelector('a[href="/#registration"]');
    expect(element).not.toBeNull();
  });

  test('Catalog link should be present in Navigation Bar', () => {
    const element = actualComponentMarkup.querySelector('a[href="/#catalog"]');
    expect(element).not.toBeNull();
  });

  test('My Profile link should be present in Navigation Bar', () => {
    const element = actualComponentMarkup.querySelector('a[href="/#my-profile"]');
    expect(element).not.toBeNull();
  });

  test('Cart link should be present in Navigation Bar', () => {
    const element = actualComponentMarkup.querySelector('a[href="/#cart"]');
    expect(element).not.toBeNull();
  });

  test('About Us link should be present in Navigation Bar', () => {
    const element = actualComponentMarkup.querySelector('a[href="/#about-us"]');
    expect(element).not.toBeNull();
  });
});
