import { Customer } from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import { GetCustomerInfo } from '../../backend/customer/getCustomer';
import { UpdateCustomerInfo } from '../../backend/customer/updateCustomer';
import TostifyHelper from '../../utils/TostifyHelper';

class MyProfilePage extends Page {
  customer: Customer | null = null;

  inputPersonalInfo: string[] = [];

  inputPasswordInfo: string[] = [];

  private MY_PROFILE_PAGE_MARKUP = `
  <h1 class='page-title'>My Profile Page</h1>
  <div class='customer-container'></div>
  `;

  constructor() {
    super(ProjectPages.MyProfile);
  }

  private getUserId(): string {
    return localStorage.getItem('registration-successful')?.replace(/"/g, '') ?? '';
  }

  private toggleEditModePersonalInfo(button: HTMLButtonElement): void {
    const inputFields = this.CONTAINER.querySelectorAll('.personal-input');
    const isEditing = button.textContent === 'Edit';

    const originalButton = button;

    if (isEditing) {
      inputFields.forEach((input) => {
        input.removeAttribute('disabled');
        input.classList.remove('transparent-input');
      });
      originalButton.textContent = 'Save';

      this.inputPersonalInfo = [];
    } else {
      inputFields.forEach((input) => {
        input.setAttribute('disabled', 'disabled');
        input.classList.add('transparent-input');

        this.inputPersonalInfo?.push((input as HTMLInputElement).value);
      });
      const updateCustomerInfo = new UpdateCustomerInfo(this.getUserId());
      const [firstName, lastName, dateOfBirth, email] = this.inputPersonalInfo;
      const version = this.customer?.version || 0;

      updateCustomerInfo
        .updateCustomerInfo(firstName, lastName, dateOfBirth, email, version)
        .then((response) => {
          this.customer = response.body;
          // eslint-disable-next-line no-console
          console.log(this.customer);

          TostifyHelper.showToast('Updating personal information successfully', '#000');
        })
        .catch((err) => {
          TostifyHelper.showToast('Updating personal information failed', '#000');
          throw err;
        });

      originalButton.textContent = 'Edit';
    }
  }

  private toggleEditModePassword(button: HTMLButtonElement): void {
    const inputCurrentPassword = this.CONTAINER.querySelector('#input-current-password') as HTMLInputElement;
    const inputNewPassword = this.CONTAINER.querySelector('#input-new-password') as HTMLInputElement;
    const inputConfirmNewPassword = this.CONTAINER.querySelector('#input-confirm-new-password') as HTMLInputElement;

    const isEditing = button.textContent === 'Edit';
    const originalButton = button;

    const passwordInputs = [inputCurrentPassword, inputNewPassword, inputConfirmNewPassword];

    if (isEditing) {
      passwordInputs.forEach((input) => {
        input.removeAttribute('disabled');
      });

      originalButton.textContent = 'Save';
      this.handleLockIconClickLoginPage();

      this.inputPasswordInfo = [];
    } else {
      passwordInputs.forEach((input) => {
        input.setAttribute('disabled', 'disabled');
        this.inputPasswordInfo.push(input.value);
      });
      originalButton.textContent = 'Edit';
      TostifyHelper.showToast('Password updated successfully', '#000');
      // eslint-disable-next-line no-console
      console.log(this.inputPasswordInfo);
    }
  }

  private updateCustomerInfo(customerId: string): void {
    const customerInfoGetter = new GetCustomerInfo(customerId);
    customerInfoGetter
      .getProfileInfo()
      .then((response) => {
        const customerDiv = this.CONTAINER.querySelector('.customer-container');
        this.customer = response.body;

        if (response.statusCode === 200 && customerDiv) {
          const defaultShippingAddress = response.body.addresses?.find(
            (item) => item.id === response.body.defaultShippingAddressId,
          );
          const defaultBillingAddress = response.body.addresses?.find(
            (item) => item.id === response.body.defaultBillingAddressId,
          );

          customerDiv.innerHTML = `
          <div class='customer-personal-data'>
            <div class='input-container'>
              <label class='input-label'>Name:</label>
              <input class='transparent-input personal-input' type='text' value='${
                response.body.firstName || ''
              }' disabled />
            </div>
            <div class='input-container'>
              <label class='input-label'>Last Name:</label>
              <input class='transparent-input personal-input' type='text' value='${
                response.body.lastName || ''
              }' disabled />
            </div>
            <div class='input-container'>
              <label class='input-label'>Birth Date:</label>
              <input class='transparent-input personal-input' type='date' value='${
                response.body.dateOfBirth || ''
              }' disabled />
            </div>
            <div class='input-container'>
              <label class='input-label'>E-MAIL:</label>
              <input class='transparent-input personal-input' type='email' value='${
                response.body.email || ''
              }' disabled />
            </div>
            <button class='customer-personal-button' id='edit-personal-info'>Edit</button>
          </div>

          <div class='customer-password'>
            <div class='input-container'>
              <label class='input-label'>Current Password:</label>
              <input class='' id='input-current-password'  type='password' disabled />
              <span class='icon icon-lock' id='button-current-password'><i class='bx bxs-lock-alt'></i></span>
            </div>
            <div class='input-container'>
              <label class='input-label'>New Password:</label>
              <input class='' id='input-new-password' type='password' disabled />
              <span class='icon icon-lock' id='button-new-password'><i class='bx bxs-lock-alt'></i></span>
            </div>
            <div class='input-container'>
              <label class='input-label'>Confirm New Password:</label>
              <input class='' id='input-confirm-new-password' type='password' disabled />
              <span class='icon icon-lock' id='button-confirm-new-password'><i class='bx bxs-lock-alt'></i></span>
            </div>
            <button class='customer-personal-button' id='edit-password-info'>Edit</button>
         </div>

          <div class='input-container'>
          <label class='input-label'>Default Shipping Address</label>
          <select class='customer-address-select' disabled>
            <option>
              ${defaultShippingAddress?.country || '--'}, 
              ${defaultShippingAddress?.city || '--'}, 
              ${defaultShippingAddress?.streetName || '--'}, 
              ${defaultShippingAddress?.postalCode || '--'}
            </option>
            ${response.body?.addresses
              ?.filter((address) => address.id !== defaultShippingAddress?.id)
              ?.map(
                (address) => `
                  <option>
                    ${address.country || '--'}, 
                    ${address.city || '--'}, 
                    ${address.streetName || '--'}, 
                    ${address.postalCode || '--'}
                  </option>
                `,
              )
              ?.join('')}
          </select>
        </div>

        <div class='input-container'>
          <label class='input-label'>Default Billing Address</label>
          <select class='customer-address-select' disabled>
          <option>
            ${defaultBillingAddress?.country || '--'}, 
            ${defaultBillingAddress?.city || '--'}, 
            ${defaultBillingAddress?.streetName || '--'}, 
            ${defaultBillingAddress?.postalCode || '--'}
          </option>
          ${response.body?.addresses
            ?.filter((address) => address.id !== defaultBillingAddress?.id)
            ?.map(
              (address) => `
                <option>
                  ${address.country || '--'}, 
                  ${address.city || '--'}, 
                  ${address.streetName || '--'}, 
                  ${address.postalCode || '--'}
                </option>
              `,
            )
            ?.join('')}
          </select>
        </div>

          <table class='customer-address-table'>
          <tr class='customer-description-row'>
            <td>Country</td>
            <td>City</td>
            <td>Street</td>
            <td>ZIP Code</td>
          </tr>
          ${response.body?.addresses
            ?.filter((address) => address.id !== defaultShippingAddress?.id && address.id !== defaultBillingAddress?.id)
            ?.map(
              (address) => `
              <tr class='customer-address-row'>
                <td class='customer-address-item'>${address.country || ''}</td>
                <td class='customer-address-item'>${address.city || ''}</td>
                <td class='customer-address-item'>${address.streetName || ''}</td>
                <td class='customer-address-item'>${address.postalCode || ''}</td>
              </tr>
            `,
            )
            ?.join('')}
        </table>
          `;
          // eslint-disable-next-line no-console
          console.log(response.body);

          customerDiv.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            if (target.id === 'edit-personal-info') {
              this.toggleEditModePersonalInfo(target);
            }
            if (target.id === 'edit-password-info') {
              this.toggleEditModePassword(target);
            }
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  private handleLockIconClickLoginPage(): void {
    const lockIcons = this.CONTAINER.querySelectorAll('.icon-lock');

    lockIcons.forEach((lockIcon) => {
      lockIcon.addEventListener('click', () => {
        const passwordInput = lockIcon.previousElementSibling as HTMLInputElement;
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
        } else {
          passwordInput.type = 'password';
        }
      });
    });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.MY_PROFILE_PAGE_MARKUP;
    this.updateCustomerInfo(this.getUserId());
    return this.CONTAINER;
  }
}

export default MyProfilePage;
