import NavigationBar from '../../../src/components/navigation-bar/NavigationBar';

describe('NavigationBar', () => {
  let navigationBar: NavigationBar;
  const containerClassName = 'test-nav-name';
  const expectedNavigationBarMarkup = `
    <a href="/#">Main</a>
    <a href="/#login-page">Login page</a>
    <a href="/#registration-page">Registration page</a>
  `;

  beforeEach(() => {
    const container = document.createElement('nav');
    container.className = containerClassName;
    document.body.appendChild(container);
    navigationBar = new NavigationBar(container.tagName, containerClassName);
  });

  afterEach(() => {
    const container = document.querySelector(`.${containerClassName}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderComponent should render the navigation bar markup', () => {
    let container = document.querySelector(`.${containerClassName}`);
    expect(container?.innerHTML).toBe('');

    container = navigationBar.renderComponent();

    expect(container?.innerHTML).toContain(expectedNavigationBarMarkup.trim());
    expect(container?.className).toBe(containerClassName);
  });
});
