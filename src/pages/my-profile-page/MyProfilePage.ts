import { Customer } from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import { GetCustomerInfo } from '../../backend/customer/getCustomer';
import { UpdateCustomerInfo } from '../../backend/customer/updateCustomer';
import TostifyHelper from '../../utils/TostifyHelper';
import Constants from '../../utils/Constants';

class MyProfilePage extends Page {
  customer: Customer | null = null;

  inputPersonalInfo: string[] = [];

  inputPasswordInfo: string[] = [];

  selectAddressesInfo: string[] = [];

  selectAddressInfo: string[] = [];

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
          TostifyHelper.showToast('Updating personal information successfully', Constants.TOAST_COLOR_GREEN);
        })
        .catch((err) => {
          TostifyHelper.showToast('Updating personal information failed', Constants.TOAST_COLOR_GREEN);
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

    this.handleLockIconClickLoginPage();

    if (isEditing) {
      passwordInputs.forEach((input) => {
        input.removeAttribute('disabled');
      });

      originalButton.textContent = 'Save';
      this.inputPasswordInfo = [];
    } else {
      passwordInputs.forEach((input) => {
        input.setAttribute('disabled', 'disabled');
        this.inputPasswordInfo.push(input.value);
      });

      const updateCustomerInfo = new UpdateCustomerInfo(this.getUserId());
      updateCustomerInfo
        .changeCustomerPassword(inputCurrentPassword.value, inputNewPassword.value, this.customer?.version || 0)
        .then((response) => {
          this.customer = response.body;
          TostifyHelper.showToast('Updating password successfully', Constants.TOAST_COLOR_GREEN);
        })
        .catch((err) => {
          TostifyHelper.showToast('Updating password failed', Constants.TOAST_COLOR_RED);
          throw err;
        });

      originalButton.textContent = 'Edit';
      inputCurrentPassword.value = '';
      inputNewPassword.value = '';
      inputConfirmNewPassword.value = '';
    }
  }

  private toggleEditModeDefaultAddresses(button: HTMLButtonElement): void {
    const selectBillingAddress = this.CONTAINER.querySelector('#default-billing') as HTMLSelectElement;
    const selectShippingAddress = this.CONTAINER.querySelector('#default-shipping') as HTMLSelectElement;

    const isEditing = button.textContent === 'Edit';
    const originalButton = button;

    const selectAddresses = [selectShippingAddress, selectBillingAddress];

    if (isEditing) {
      selectAddresses.forEach((address) => address.removeAttribute('disabled'));
      originalButton.textContent = 'Save';
    } else {
      selectAddresses.forEach((address) => {
        address.setAttribute('disabled', 'disabled');
      });

      this.updateBillingAddress()
        .then(() => this.updateShippingAddress())
        .then(() => {
          TostifyHelper.showToast('Default address updated successfully', Constants.TOAST_COLOR_GREEN);
          originalButton.textContent = 'Edit';
        })
        .catch((err) => {
          TostifyHelper.showToast('Default address update failed', Constants.TOAST_COLOR_RED);
          throw err;
        });
    }
  }

  private async updateBillingAddress(): Promise<void> {
    const selectBilling = document.querySelector('#default-billing') as HTMLSelectElement;
    const selectedOptionId = selectBilling.selectedOptions[0].id.split('-')[2];
    const updateCustomerInfoBilling = new UpdateCustomerInfo(this.getUserId());

    return updateCustomerInfoBilling
      .setDefaultBillingAddress(selectedOptionId, this.customer?.version || 0)
      .then((response) => {
        this.customer = response.body;
      });
  }

  private async updateShippingAddress(): Promise<void> {
    const selectShipping = document.querySelector('#default-shipping') as HTMLSelectElement;
    const selectedOptionId = selectShipping.selectedOptions[0].id.split('-')[2];
    const updateCustomerInfoShipping = new UpdateCustomerInfo(this.getUserId());

    return updateCustomerInfoShipping
      .setDefaultShippingAddress(selectedOptionId, this.customer?.version || 0)
      .then((response) => {
        this.customer = response.body;
      });
  }

  private toggleEditModeAddress(button: HTMLButtonElement): void {
    // eslint-disable-next-line no-console
    console.log(button.id);

    const id = button.id.split('-')[1];

    const isEditing = button.textContent === 'Edit';
    const originalButton = button;

    const selectCountry = this.CONTAINER.querySelector(`#select-${id}`) as HTMLSelectElement;
    const inputCity = this.CONTAINER.querySelector(`#city-${id}`) as HTMLInputElement;
    const inputStreet = this.CONTAINER.querySelector(`#street-${id}`) as HTMLInputElement;
    const inputZip = this.CONTAINER.querySelector(`#zip-${id}`) as HTMLInputElement;

    const fullAddress = [selectCountry, inputCity, inputStreet, inputZip];

    // eslint-disable-next-line no-console
    console.log(selectCountry.value, inputCity.value, inputStreet.value, inputZip.value);

    if (isEditing) {
      fullAddress.forEach((address) => address.removeAttribute('disabled'));

      originalButton.textContent = 'Save';
      this.selectAddressInfo = [];
    } else {
      fullAddress.forEach((address) => {
        address.setAttribute('disabled', 'disabled');
        this.selectAddressInfo.push(address.value);
      });

      originalButton.textContent = 'Edit';
      TostifyHelper.showToast('Address updated successfully', Constants.TOAST_COLOR_GREEN);
      // eslint-disable-next-line no-console
      console.log(this.selectAddressInfo);
    }
  }

  private deleteAddress(button: HTMLButtonElement): void {
    const id = button.id.split('-')[1];

    const address = this.CONTAINER.querySelector(`#address-${id}`) as HTMLElement;
    const defaultBillingOption = this.CONTAINER.querySelector(`#option-billing-${id}`) as HTMLOptionElement;
    const defaultShippingOption = this.CONTAINER.querySelector(`#option-shipping-${id}`) as HTMLOptionElement;

    if (address) {
      address.remove();
      defaultBillingOption.remove();
      defaultShippingOption.remove();

      TostifyHelper.showToast('Address deleted successfully', Constants.TOAST_COLOR_GREEN);
    }
  }

  private createAddress(): void {
    const selectCountry = this.CONTAINER.querySelector('#create-country') as HTMLSelectElement;
    const inputCity = this.CONTAINER.querySelector('#create-city') as HTMLInputElement;
    const inputStreet = this.CONTAINER.querySelector('#create-street') as HTMLInputElement;
    const inputZip = this.CONTAINER.querySelector('#create-zip') as HTMLInputElement;

    // const addressInputs = [inputCity, inputStreet, inputZip];

    const addressContainer = this.CONTAINER.querySelector('#existing-addresses') as HTMLDivElement;

    const address = this.customer?.addresses[0];

    // после того как получу ответ при создании запроса, отфильтровать ID нового адреса и добавить в разметку
    // актуальный ID нового адреса
    // добавить новый адрес в options в выборе дефолтного адреса

    addressContainer.innerHTML += `<div class="customer-address" id="address-${address?.id || ''}">
      <div class="input-container">
        <label class="input-label">Country:</label>
        <select class="address-input" id="select-${address?.id || ''}" disabled>
          <option>${selectCountry.value || ''}</option>
          <option>${selectCountry.value === 'US' ? 'CA' : 'US'}</option>
        </select>
      </div>
      <div class="input-container">
        <label class="input-label">City:</label>
        <input class="address-input" id="city-${address?.id || ''}" type="text" value="${
          inputCity.value || ''
        }" disabled />
      </div>
      <div class="input-container">
        <label class="input-label">Street:</label>
        <input class="address-input" id="street-${address?.id || ''}" type="text" value="${
          inputStreet.value || ''
        }" disabled />
      </div>
      <div class="input-container">
        <label class="input-label">ZIP Code:</label>
        <input class="address-input" id="zip-${address?.id || ''}" type="text" value="${
          inputZip.value || ''
        }" disabled />
      </div>
      <div class="customer-button-container">
        <button class="customer-personal-button edit-button-address" id="edit-${address?.id || ''}">Edit</button>
        <button class="customer-personal-button delete-button-address" id="delete-${address?.id || ''}">Delete</button>
      </div>
    </div>`;

    inputCity.value = '';
    inputStreet.value = '';
    inputZip.value = '';
    selectCountry.selectedIndex = 0;
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
          <form class="customer-personal-data customer-container-item" novalidate="novalidate">
            <div class="input-container">
              <label class="input-label">Name:</label>
              <input class="transparent-input personal-input" type="text" value="${
                response.body.firstName || ''
              }" disabled />
            </div>
            <div class="input-container">
              <label class="input-label">Last Name:</label>
              <input class="transparent-input personal-input" type="text" value="${
                response.body.lastName || ''
              }" disabled />
            </div>
            <div class="input-container">
              <label class="input-label">Birth Date:</label>
              <input class="transparent-input personal-input" type="date" value="${
                response.body.dateOfBirth || ''
              }" disabled />
            </div>
            <div class="input-container">
              <label class="input-label">E-MAIL:</label>
              <input class="transparent-input personal-input" type="email" value="${
                response.body.email || ''
              }" disabled />
            </div>
            <button class="customer-personal-button" id="edit-personal-info">Edit</button>
          </form>

          <form class="customer-password customer-container-item" novalidate="novalidate">
            <div class="input-container">
              <label class="input-label">Current Password:</label>
              <input class="" id="input-current-password"  type="password" disabled />
              <span class="icon icon-lock" id="button-current-password"><i class="bx bxs-lock-alt"></i></span>
            </div>
            <div class="input-container">
              <label class="input-label">New Password:</label>
              <input class="" id="input-new-password" type="password" disabled />
              <span class="icon icon-lock" id="button-new-password"><i class="bx bxs-lock-alt"></i></span>
            </div>
            <div class="input-container">
              <label class="input-label">Confirm New Password:</label>
              <input class="" id="input-confirm-new-password" type="password" disabled />
              <span class="icon icon-lock" id="button-confirm-new-password"><i class="bx bxs-lock-alt"></i></span>
            </div>
            <button class="customer-personal-button" id="edit-password-info">Edit</button>
         </form>


         <form class="customer-default-address customer-container-item" novalidate="novalidate">
           <div class="input-container">
             <label class="input-label">Default Shipping Address</label>
             <select class="customer-address-select" id="default-shipping" disabled>
              <option id="option-shipping-${defaultShippingAddress?.id || '--'}">
                ${defaultShippingAddress?.country || 'not selected'}, 
                ${defaultShippingAddress?.city || ''}, 
                ${defaultShippingAddress?.streetName || ''}, 
                ${defaultShippingAddress?.postalCode || ''}
              </option>
              ${response.body?.addresses
                ?.filter((address) => address.id !== defaultShippingAddress?.id)
                ?.map(
                  (address) => `
                  <option id="option-shipping-${address.id || '--'}">
                    ${address.country || '--'}, 
                    ${address.city || '--'}, 
                    ${address.streetName || '--'}, 
                    ${address.postalCode || '--'}
                  </option>`,
                )
                ?.join('')}
              </select>
            </div>

        <div class="input-container">
          <label class="input-label">Default Billing Address</label>
          <select class="customer-address-select" id="default-billing" disabled>
          <option id="option-billing-${defaultBillingAddress?.id || '--'}">
            ${defaultBillingAddress?.country || 'not selected'}, 
            ${defaultBillingAddress?.city || ''}, 
            ${defaultBillingAddress?.streetName || ''}, 
            ${defaultBillingAddress?.postalCode || ''}
          </option>
          ${response.body?.addresses
            ?.filter((address) => address.id !== defaultBillingAddress?.id)
            ?.map(
              (address) => `
                <option id="option-billing-${address.id || '--'}">
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
        <button class="customer-personal-button" id="edit-default-addresses">Edit</button>
      </form>

      <form class="new-address customer-address">
        <div class="input-container">
          <label class="input-label">Country:</label>
          <select class="address-input" id='create-country'>
            <option>US</option>
            <option>CA</option>
          </select>
        </div>
        <div class="input-container">
          <label class="input-label">City:</label>
          <input class="address-input" id='create-city' placeholder="City" />
        </div>
        <div class="input-container">
          <label class="input-label">Street:</label>
          <input class="address-input" id='create-street' placeholder="Street" />
        </div>
        <div class="input-container">
          <label class="input-label">ZIP Code:</label>
          <input class="address-input" id='create-zip' placeholder="ZIP Code" />
        </div>
        <button class="customer-personal-button save-button" id='create-address'>Add</button>
      </form>

      <div class="existing-addresses" id = "existing-addresses" > ${response.body?.addresses
        ?.map(
          (address) => `<form class="customer-address" id="address-${address.id || ''}">
              <div class="input-container">
                <label class="input-label">Country:</label>
                <select class="address-input" id="select-${address.id || ''}" disabled>
                  <option>${address.country || ''}</option>
                  <option>${address.country === 'US' ? 'CA' : 'US'}</option>
                </select>
              </div>
              <div class="input-container">
                <label class="input-label">City:</label>
                <input class="address-input" id='city-${address.id || ''}' type="text" value="${
                  address.city || ''
                }" disabled />
              </div>
              <div class="input-container">
                <label class="input-label">Street:</label>
                <input class="address-input" id='street-${address.id || ''}' type="text" value="${
                  address.streetName || ''
                }" disabled />
              </div>
              <div class="input-container">
                <label class="input-label">ZIP Code:</label>
                <input class="address-input" id='zip-${address.id || ''}' type="text" value="${
                  address.postalCode || ''
                }" disabled />
              </div>
              <div class="customer-button-container">
                <button class="customer-personal-button edit-button-address" id="edit-${address.id || ''}">Edit</button>
                <button class="customer-personal-button delete-button-address" id="delete-${
                  address.id || ''
                }">Delete</button>
              </div>
            </form>`,
        )
        ?.join('')}
      </div>`;

          // eslint-disable-next-line no-console
          console.log(response.body);

          customerDiv.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target as HTMLButtonElement;
            if (target.id === 'edit-personal-info') {
              this.toggleEditModePersonalInfo(target);
            }
            if (target.id === 'edit-password-info') {
              this.toggleEditModePassword(target);
            }
            if (target.id === 'edit-default-addresses') {
              this.toggleEditModeDefaultAddresses(target);
            }
            if (target.classList.contains('edit-button-address')) {
              this.toggleEditModeAddress(target);
            }
            if (target.classList.contains('delete-button-address')) {
              this.deleteAddress(target);
            }
            if (target.id === 'create-address') {
              this.createAddress();
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
