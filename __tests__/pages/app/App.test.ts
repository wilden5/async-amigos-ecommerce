import App from '../../../src/pages/app/App';

describe('App', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  test('App should be initialized correctly', () => {
    expect(app).toBeInstanceOf(App);
  });

  test('init method should be called during app initialization', () => {
    const initSpy = jest.spyOn(app, 'init');

    app.init();

    expect(initSpy).toHaveBeenCalled();
  });
});
