import MyProfilePage from '../../../src/pages/my-profile-page/MyProfilePage';

describe('MyProfilePage', () => {
  let myProfilePage: MyProfilePage;
  const containerId = 'test-container';
  const expectedPageMarkup = `<h1 class="page-title">My Profile Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    myProfilePage = new MyProfilePage();
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the my profile page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = myProfilePage.renderPage();

    expect(container?.innerHTML).toContain(expectedPageMarkup.trim());
  });
});
