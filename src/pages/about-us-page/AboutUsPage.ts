import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import solidUrl from '../../assets/about-us/solid.png';
import wilden5Url from '../../assets/about-us/wilden5.png';
import linseazUrl from '../../assets/about-us/linseaz.png';
import schoolUrl from '../../assets/rs_school.svg';

class AboutUsPage extends Page {
  private ABOUT_US_PAGE_MARKUP = `
  <div class="about-us__container">
      <section class="about-us">
        <h2 class="about-us__title">About Project</h2>
        <p class="description-collaboration">The Computer E-Commerce Application is a user-friendly and feature-rich online platform designed to cater to computer enthusiasts, gamers, and professionals looking to purchase high-quality computer hardware. With an intuitive user interface and a vast range of products, our application aims to provide a seamless shopping experience for customers seeking the latest and most reliable computer components.
        </p>
        <p class="description-collaboration">Our project's success was driven by effective collaboration. We meticulously organized   tasks on the Jira board, allocating them to each sprint for maximum productivity. Daily Discord meetings allowed us to    address challenges promptly and provide assistance when team members faced difficulties with their tasks. This open and    collaborative approach ensured that our project was completed successfully and efficiently.
        </p>
      </section>
      <section class="about-us" id="about-us">
      <h2 class="about-us__title">About Our Team</h2>
      <div class="team-member__container">
      <div class="team-member">
          <img src="${solidUrl}" alt="Team Member 1" class="team-member__image">
          <div class="member-info">
              <h2 class="member-info__name">Pavel Konyakhin</h2>
              <p class="member-info__role">Role: Frontend Developer</p>
              <p class="member-info__bio"><span class="about-us-highlight">Info:</span> Pavel is an experienced developer with a passion for creating efficient and user-friendly applications. He played a key role in the creation of our task board, ensuring smooth project management. Pavel was also responsible for the implementation of the detailed product page. His experience and negotiation skills in cross-checking played an important role in our work.</p>
              <a href="https://github.com/solidados" target="_blank" class="member-info__link">GitHub Profile</a>
          </div>
      </div>
      <div class="team-member">
          <img src="${wilden5Url}" alt="Team Member 2" class="team-member__image">
          <div class="member-info">
              <h2 class="member-info__name">Denis Ivanchenko</h2>
              <p class="member-info__role">Role: Frontend Developer, Team Lead</p>
              <p class="member-info__bio"><span class="about-us-highlight">Info:</span> Denis is a goal-oriented developer focused on creating reliable applications. He is the leader of our team. He created the repository, implemented the registration page and routing. Denis also contributed significantly to the implementation of the catalog and shopping cart pages. His thorough testing and test writing has significantly improved the reliability of our project.</p>
              <a href="https://github.com/wilden5" target="_blank" class="member-info__link">GitHub Profile</a>
          </div>
      </div>
      <div class="team-member">
          <img src="${linseazUrl}" alt="Team Member 3" class="team-member__image">
          <div class="member-info">
              <h2 class="member-info__name">Illia Mielnikov</h2>
              <p class="member-info__role">Role: Frontend Developer</p>
              <p class="member-info__bio"><span class="about-us-highlight">Info:</span> Illia is a valuable member of our team who has made a contribution to the development of our site. His work has helped make our site more user-friendly and informative for users. He developed the "User Profile Page" which makes the project more informative and interactive. Users can view their profile information as well as manage their settings, and also developed the "About Us" page.</p>
              <a href="https://github.com/Linseaz" target="_blank" class="member-info__link">GitHub Profile</a>
          </div>
        </div>
      </div>
    </section>
    <section class="rs-school-logo" id="rs-school-logo">
        <a href="https://rs.school/" target="_blank" class="rs-school-logo__link">
            <img src="${schoolUrl}" alt="RS School Logo" class="rs-school-logo__image">
        </a>
    </section>
  </div>`;

  constructor() {
    super(ProjectPages.AboutUs);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.ABOUT_US_PAGE_MARKUP.trim();
    return this.CONTAINER;
  }
}

export default AboutUsPage;
