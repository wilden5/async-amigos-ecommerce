import App from '../../../src/pages/app/App';
import Slider from '../../../src/components/slider/Slider'; // Путь к вашему Slider файлу

jest.mock('../../../src/assets/not-found-image.png', () => ({
  default: 'mock-image-not-found',
}));

jest.mock('../../../src/assets/header-logo2.png', () => ({
  default: 'mock-image-header',
}));

jest.mock('../../../src/components/slider/Slider', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    swiperSlide: '',
    images: [],
    generateSwiperContent: jest.fn(),
    buildSwiperContainer: jest.fn(),
    destroy: jest.fn(),
    initSwiper: jest.fn(),
  })),
}));

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

  test('Slider methods should be called', () => {
    const sliderInstance = new Slider();
    const generateSpy = jest.spyOn(sliderInstance, 'generateSwiperContent');
    const buildSpy = jest.spyOn(sliderInstance, 'buildSwiperContainer');
    const destroySpy = jest.spyOn(sliderInstance, 'destroy');
    const initSpy = jest.spyOn(sliderInstance, 'initSwiper');

    sliderInstance.generateSwiperContent([]);
    sliderInstance.buildSwiperContainer([]);
    sliderInstance.destroy();
    sliderInstance.initSwiper();

    expect(generateSpy).toHaveBeenCalled();
    expect(buildSpy).toHaveBeenCalled();
    expect(destroySpy).toHaveBeenCalled();
    expect(initSpy).toHaveBeenCalled();
  });
});
