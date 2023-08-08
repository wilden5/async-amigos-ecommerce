import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
// import DOMHelpers from '../../utils/DOMHelpers';
// import LockState from './LoginPageControl';

class LoginPage extends Page {
  private LOGIN_PAGE_MARKUP =
    `<div class="container-login">
      <div class="main-box login">
        <h2>Login</h2>
        <form id="login-form">
          <div class="input-box">
            <span class="icon"><i class='bx bxs-envelope'></i></span>
            <input type="email" name="email" required>
            <label for="email">Email</label>
          </div>
          <div class="input-box">
            <span class="icon icon-lock"><i class='bx bxs-lock-alt'></i></span>
            <input type="password" name="password" class="input-password" required>
            <label for="password">Password</label>
          </div>
          <button class="main-btn" type="submit">Login</button>
          <div class="register">
            <p>New customer?<a href="#registration-page" class="register-link">Register</a></p>
          </div>
        </form>
      </div>
    </div>`;


  constructor() {
    super(ProjectPages.LoginPage);
  }


  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.LOGIN_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default LoginPage;
