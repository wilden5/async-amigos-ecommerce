import Swiper from 'swiper';

interface SwiperMethods {
  init: jest.Mock;
  destroy: jest.Mock;
  slideNext: jest.Mock;
  slidePrev: jest.Mock;
}

jest.mock('swiper', () => {
  const SwiperMock = jest.fn().mockImplementation(() => ({
    init: jest.fn(),
    destroy: jest.fn(),
    slideNext: jest.fn(),
    slidePrev: jest.fn(),
  }));

  return {
    __esModule: true,
    default: SwiperMock,
  };
});

describe('Swiper Mock Test', (): void => {
  let swiper: SwiperMethods;

  beforeEach((): void => {
    swiper = new Swiper('.swiper-container') as unknown as SwiperMethods;
  });

  test('Swiper should have init method', (): void => {
    expect(swiper.init).toBeDefined();
  });

  test('init method should be called during Swiper initialization', (): void => {
    swiper.init();
    expect(swiper.init).toHaveBeenCalled();
  });

  test('Swiper should have destroy method', (): void => {
    expect(swiper.destroy).toBeDefined();
  });

  test('destroy method should be called when Swiper is destroyed', (): void => {
    swiper.destroy();
    expect(swiper.destroy).toHaveBeenCalled();
  });
});
