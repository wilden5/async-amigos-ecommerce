import Page from '../../components/templates/Page';
import Constants from '../../utils/Constants';

class HomePage extends Page {
  private HOME_PAGE_MARKUP = `
    <div class="home__container">
      <aside class="aside-bar">
        <h1 class='page-title'>Home Page</h1>
        <ul class="aside-bar__list">
          <li class="aside-bar__item"><a href="#"></a></li>
          <li class="aside-bar__item"><a href='#catalog'>Catalog</a></li>
          <li class="aside-bar__item"><a href='#about-us'>About Us</a></li>
          <li class="aside-bar__item"><a href='#cart'>Cart</a></li>
          <li class="aside-bar__item"><a href='#my-profile'>My Profile</a></li>
          <li class="aside-bar__item"><a href='#login'>Login</a></li>
          <li class="aside-bar__item"><a href='#registration'>Registration</a></li>
        </ul>
      </aside>
    </div>  
`;

  constructor() {
    super(Constants.HOME_PAGE_SELECTOR);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.HOME_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default HomePage;
