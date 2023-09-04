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
      });
      originalButton.textContent = 'Save';

      this.inputPersonalInfo = [];
    } else {
      this.inputPersonalInfo = [];
      inputFields.forEach((input) => {
        this.inputPersonalInfo?.push((input as HTMLInputElement).value);
      });

      const [firstName, lastName, dateOfBirth, email] = this.inputPersonalInfo;
      const version = this.customer?.version || 0;

      const isPersonalInfoValid = this.validatePersonalInfo(firstName, lastName, dateOfBirth, email);

      if (isPersonalInfoValid) {
        return;
      }

      const updateCustomerInfo = new UpdateCustomerInfo(this.getUserId());
      updateCustomerInfo
        .updateCustomerInfo(firstName, lastName, dateOfBirth, email, version)
        .then((response) => {
          this.customer = response.body;
          TostifyHelper.showToast('Updating personal information successfully', Constants.TOAST_COLOR_GREEN);
          inputFields.forEach((input) => {
            input.setAttribute('disabled', 'disabled');
          });
        })
        .catch(() => {
          TostifyHelper.showToast('Updating personal information failed', Constants.TOAST_COLOR_RED);
        });

      originalButton.textContent = 'Edit';
    }
  }

  private validatePersonalInfo(firstName: string, lastName: string, dateOfBirth: string, email: string): boolean {
    const namePattern = /^[A-Za-z]+$/;
    const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    const isFirstNameValid = namePattern.test(firstName);
    const isLastNameValid = namePattern.test(lastName);
    const isDateOfBirthValid = dateOfBirthPattern.test(dateOfBirth);
    const isEmailValid = emailPattern.test(email);

    const errorMessages: string[] = [];

    if (!isFirstNameValid) {
      errorMessages.push('The name contains invalid characters');
    }

    if (!isLastNameValid) {
      errorMessages.push('Last name contains invalid characters');
    }

    if (!isDateOfBirthValid) {
      errorMessages.push('The date of birth is in the wrong format');
    } else {
      const dateParts = dateOfBirth.split('-');
      const yearOfBirth = parseInt(dateParts[0], 10);
      if (yearOfBirth < 1900 || yearOfBirth > 2022) {
        errorMessages.push('Year of birth must be between 1900 and 2022');
      }
    }

    if (!isEmailValid) {
      errorMessages.push('Email is not in the correct format');
    }

    if (errorMessages.length > 0) {
      const errorMessage = errorMessages.join('\n');
      TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
    }

    return errorMessages.length > 0;
  }

  private toggleEditModePassword(button: HTMLButtonElement): void {
    const inputCurrentPassword = this.CONTAINER.querySelector('#input-current-password') as HTMLInputElement;
    const inputNewPassword = this.CONTAINER.querySelector('#input-new-password') as HTMLInputElement;

    const isEditing = button.textContent === 'Edit';
    const originalButton = button;

    const passwordInputs = [inputCurrentPassword, inputNewPassword];

    this.handleLockIconClickLoginPage();

    if (isEditing) {
      passwordInputs.forEach((input) => {
        input.removeAttribute('disabled');
      });

      originalButton.textContent = 'Save';
      this.inputPasswordInfo = [];
    } else {
      this.inputPasswordInfo = [];
      passwordInputs.forEach((input) => {
        this.inputPasswordInfo.push(input.value);
      });

      const currentPassword = inputCurrentPassword.value;
      const newPassword = inputNewPassword.value;

      const isPasswordValid = this.validatePassword(currentPassword, newPassword);

      if (!isPasswordValid) {
        return;
      }

      const updateCustomerInfo = new UpdateCustomerInfo(this.getUserId());
      updateCustomerInfo
        .changeCustomerPassword(inputCurrentPassword.value, inputNewPassword.value, this.customer?.version || 0)
        .then((response) => {
          passwordInputs.forEach((input) => {
            input.setAttribute('disabled', 'disabled');
          });
          this.customer = response.body;
          TostifyHelper.showToast('Updating password successfully', Constants.TOAST_COLOR_GREEN);
        })
        .catch(() => {
          TostifyHelper.showToast('Updating password failed', Constants.TOAST_COLOR_RED);
        });

      originalButton.textContent = 'Edit';
      inputCurrentPassword.value = '';
      inputNewPassword.value = '';
    }
  }

  private validatePassword(currentPassword: string, newPassword: string): boolean {
    if (currentPassword.trim() === '') {
      TostifyHelper.showToast('Please enter your current password', Constants.TOAST_COLOR_RED);
      return false;
    }

    if (newPassword.trim() === '') {
      TostifyHelper.showToast('Please enter a new password', Constants.TOAST_COLOR_RED);
      return false;
    }

    if (newPassword.length < 8) {
      TostifyHelper.showToast('Password must be at least 8 characters long', Constants.TOAST_COLOR_RED);
      return false;
    }

    if (currentPassword === newPassword) {
      TostifyHelper.showToast('Your new password must not be the same as your old password', Constants.TOAST_COLOR_RED);
      return false;
    }

    const errors: string[] = [];

    if (!/[A-Z]/.test(newPassword)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(newPassword)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(newPassword)) {
      errors.push('Password must contain at least one digit');
    }

    if (!/[!@$%&*?]/.test(newPassword)) {
      errors.push('Password must contain at least one special character: !@$%&*?');
    }

    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      return false;
    }

    return true;
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
        .catch(() => {
          TostifyHelper.showToast('Default address update failed', Constants.TOAST_COLOR_RED);
        });
    }
  }

  private async updateBillingAddress(): Promise<void> {
    const selectBilling = document.querySelector('#default-billing') as HTMLSelectElement;
    const selectedOptionId = selectBilling.selectedOptions[0].id.split('Z999S')[1] || '--';
    const updateCustomerInfoBilling = new UpdateCustomerInfo(this.getUserId());

    if (selectedOptionId === '--') {
      return;
    }

    await updateCustomerInfoBilling
      .setDefaultBillingAddress(selectedOptionId, this.customer?.version || 0)
      .then((response) => {
        this.customer = response.body;
      });
  }

  private async updateShippingAddress(): Promise<void> {
    const selectShipping = document.querySelector('#default-shipping') as HTMLSelectElement;
    const selectedOptionId = selectShipping.selectedOptions[0].id.split('Z999S')[1] || '--';
    const updateCustomerInfoShipping = new UpdateCustomerInfo(this.getUserId());

    if (selectedOptionId === '--') {
      return;
    }

    await updateCustomerInfoShipping
      .setDefaultShippingAddress(selectedOptionId, this.customer?.version || 0)
      .then((response) => {
        this.customer = response.body;
      });
  }

  // private toggleEditModeAddress(button: HTMLButtonElement): void {
  //   const id = button.id.split('Z999S')[1];

  //   const isEditing = button.textContent === 'Edit';
  //   const originalButton = button;

  //   const selectCountry = this.CONTAINER.querySelector(`#select-${id}`) as HTMLSelectElement;
  //   const inputCity = this.CONTAINER.querySelector(`#city-${id}`) as HTMLInputElement;
  //   const inputStreet = this.CONTAINER.querySelector(`#street-${id}`) as HTMLInputElement;
  //   const inputZip = this.CONTAINER.querySelector(`#zip-${id}`) as HTMLInputElement;

  //   const inputs = [selectCountry, inputCity, inputStreet, inputZip];

  //   if (isEditing) {
  //     inputs.forEach((address) => address.removeAttribute('disabled'));

  //     originalButton.textContent = 'Save';
  //     this.selectAddressInfo = [];
  //   } else {
  //     this.selectAddressInfo = [];
  //     inputs.forEach((address) => {
  //       this.selectAddressInfo.push(address.value);
  //     });

  //     const [country, city, street, zip] = this.selectAddressInfo;
  //     const updateCustomerAddress = new UpdateCustomerInfo(this.getUserId());
  //     updateCustomerAddress
  //       .editCustomerAddress(country, city, street, zip, id, this.customer?.version || 0)
  //       .then((response) => {
  //         inputs.forEach((address) => {
  //           address.setAttribute('disabled', 'disabled');
  //         });
  //         this.customer = response.body;
  //         const defaultBillingOption = this.CONTAINER.querySelector(`#option-billingZ999S${id}`) as HTMLOptionElement;
  //         const defaultShippingOption = this.CONTAINER.querySelector(`#option-shippingZ999S${id}`) as HTMLOptionElement;

  //         const optionAddress = `${country}, ${city}, ${street}, ${zip}`;
  //         defaultBillingOption.textContent = optionAddress;
  //         defaultShippingOption.textContent = optionAddress;

  //         TostifyHelper.showToast('Address updated successfully', Constants.TOAST_COLOR_GREEN);
  //       })
  //       .catch(() => {
  //         TostifyHelper.showToast('Address update failed', Constants.TOAST_COLOR_RED);
  //       });
  //     originalButton.textContent = 'Edit';
  //   }
  // }

  private toggleEditModeAddress(button: HTMLButtonElement): void {
    const id = button.id.split('Z999S')[1];

    const isEditing = button.textContent === 'Edit';
    const originalButton = button;

    const selectCountry = this.CONTAINER.querySelector(`#select-${id}`) as HTMLSelectElement;
    const inputCity = this.CONTAINER.querySelector(`#city-${id}`) as HTMLInputElement;
    const inputStreet = this.CONTAINER.querySelector(`#street-${id}`) as HTMLInputElement;
    const inputZip = this.CONTAINER.querySelector(`#zip-${id}`) as HTMLInputElement;

    const inputs = [selectCountry, inputCity, inputStreet, inputZip];

    if (isEditing) {
      inputs.forEach((address) => address.removeAttribute('disabled'));

      originalButton.textContent = 'Save';
      this.selectAddressInfo = [];
    } else {
      this.selectAddressInfo = [];
      inputs.forEach((address) => {
        this.selectAddressInfo.push(address.value);
      });

      const [country, city, street, zip] = this.selectAddressInfo;

      const isAddressValid = this.validateAddress(country, city, street, zip);

      if (!isAddressValid) {
        // Если адрес не прошел валидацию, не выполняйте обновление адреса
        return;
      }

      const updateCustomerAddress = new UpdateCustomerInfo(this.getUserId());
      updateCustomerAddress
        .editCustomerAddress(country, city, street, zip, id, this.customer?.version || 0)
        .then((response) => {
          inputs.forEach((address) => {
            address.setAttribute('disabled', 'disabled');
          });
          this.customer = response.body;
          const defaultBillingOption = this.CONTAINER.querySelector(`#option-billingZ999S${id}`) as HTMLOptionElement;
          const defaultShippingOption = this.CONTAINER.querySelector(`#option-shippingZ999S${id}`) as HTMLOptionElement;

          const optionAddress = `${country}, ${city}, ${street}, ${zip}`;
          defaultBillingOption.textContent = optionAddress;
          defaultShippingOption.textContent = optionAddress;

          TostifyHelper.showToast('Address updated successfully', Constants.TOAST_COLOR_GREEN);
        })
        .catch(() => {
          TostifyHelper.showToast('Address update failed', Constants.TOAST_COLOR_RED);
        });
      originalButton.textContent = 'Edit';
    }
  }

  private validateAddress(country: string, city: string, street: string, zip: string): boolean {
    if (
      country.trim() === '' ||
      city.trim() === '' ||
      street.trim() === '' ||
      zip.trim() === '' ||
      city.length > 50 ||
      street.length > 50
    ) {
      TostifyHelper.showToast(
        'Please fill in all address fields and limit each field to 50 characters',
        Constants.TOAST_COLOR_RED,
      );
      return false;
    }

    const errors: string[] = [];

    if (!/^[a-zA-Z\s'-]+$/.test(city)) {
      errors.push('City name contains invalid characters');
    }

    if (country === 'US' && !/^\d{5}$/.test(zip)) {
      errors.push('ZIP code must be 5 digits for the United States');
    }

    if (country === 'CA' && !/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(zip)) {
      errors.push('Canadian ZIP code must have the format A1A 1A1');
    }

    if (!/^[0-9A-Za-z\s.,;:?!'-~]+(-[0-9A-Za-z\s.,;:?!'-~]+)?$/.test(street)) {
      errors.push('Street name contains invalid characters or format');
    }

    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      return false;
    }

    return true;
  }

  private deleteAddress(button: HTMLButtonElement): void {
    const id = button.id.split('Z999S')[1];

    const address = this.CONTAINER.querySelector(`#address-${id}`) as HTMLElement;
    const defaultBillingOption = this.CONTAINER.querySelector(`#option-billingZ999S${id}`) as HTMLOptionElement;
    const defaultShippingOption = this.CONTAINER.querySelector(`#option-shippingZ999S${id}`) as HTMLOptionElement;

    const deleteAddress = new UpdateCustomerInfo(this.getUserId());
    deleteAddress
      .removeCustomerAddress(id, this.customer?.version || 0)
      .then((response) => {
        this.customer = response.body;
        address.remove();
        defaultBillingOption.remove();
        defaultShippingOption.remove();

        TostifyHelper.showToast('Address deleted successfully', Constants.TOAST_COLOR_GREEN);
      })
      .catch(() => {
        TostifyHelper.showToast('Address delete failed', Constants.TOAST_COLOR_RED);
      });
  }

  private createAddress(): void {
    const selectCountry = this.CONTAINER.querySelector('#create-country') as HTMLSelectElement;
    const inputCity = this.CONTAINER.querySelector('#create-city') as HTMLInputElement;
    const inputStreet = this.CONTAINER.querySelector('#create-street') as HTMLInputElement;
    const inputZip = this.CONTAINER.querySelector('#create-zip') as HTMLInputElement;
    const addressContainer = this.CONTAINER.querySelector('#existing-addresses') as HTMLDivElement;

    const selectBillingAddress = this.CONTAINER.querySelector('#default-billing') as HTMLSelectElement;
    const selectShippingAddress = this.CONTAINER.querySelector('#default-shipping') as HTMLSelectElement;

    let addressId: string;

    if (!this.validateAddress(selectCountry.value, inputCity.value, inputStreet.value, inputZip.value)) {
      return;
    }

    const addAddress = new UpdateCustomerInfo(this.getUserId());
    addAddress
      .addCustomerAddress(
        selectCountry.value,
        inputCity.value,
        inputStreet.value,
        inputZip.value,
        this.customer?.version || 0,
      )
      .then((response) => {
        addressId = this.findAddedAddress(this.customer, response.body);

        addressContainer.innerHTML += `<div class="customer-address" id="address-${addressId}">
          <div class="input-container">
            <label class="input-label">Country:</label>
            <select class="customer-address-select" id="select-${addressId}" disabled>
              <option>${selectCountry.value || ''}</option>
              <option>${selectCountry.value === 'US' ? 'CA' : 'US'}</option>
            </select>
          </div>
          <div class="input-container">
            <label class="input-label">City:</label>
            <input class="address-input" id="city-${addressId}" type="text" value="${inputCity.value || ''}" disabled />
          </div>
          <div class="input-container">
            <label class="input-label">Street:</label>
            <input class="address-input" id="street-${addressId}" type="text" value="${
              inputStreet.value || ''
            }" disabled />
          </div>
          <div class="input-container">
            <label class="input-label">ZIP Code:</label>
            <input class="address-input" id="zip-${addressId}" type="text" value="${inputZip.value || ''}" disabled />
          </div>
          <div class="customer-button-container">
            <button class="customer-personal-button edit-button-address" id="editZ999S${addressId}">Edit</button>
            <button class="customer-personal-button delete-button-address" id="deleteZ999S${addressId}">Delete</button>
          </div>
        </div>`;

        selectBillingAddress.innerHTML += `<option id="option-billingZ999S${addressId || '--'}">
          ${selectCountry.value || '--'}, 
          ${inputCity.value || '--'}, 
          ${inputStreet.value || '--'}, 
          ${inputZip.value || '--'}</option>`;

        selectShippingAddress.innerHTML += `<option id="option-shippingZ999S${addressId || '--'}">
          ${selectCountry.value || '--'}, 
          ${inputCity.value || '--'}, 
          ${inputStreet.value || '--'}, 
          ${inputZip.value || '--'}</option>`;

        this.customer = response.body;
        TostifyHelper.showToast('Adding the address was successful', Constants.TOAST_COLOR_GREEN);

        inputCity.value = '';
        inputStreet.value = '';
        inputZip.value = '';
        selectCountry.selectedIndex = 0;
      })
      .catch(() => {
        TostifyHelper.showToast('Adding an address failed', Constants.TOAST_COLOR_RED);
      });
  }

  private findAddedAddress(oldData: Customer | null, newData: Customer): string {
    if (oldData) {
      const addedAddress = newData.addresses.find(
        (newAddress) => !oldData.addresses.some((oldAddress) => oldAddress.id === newAddress.id),
      );
      return addedAddress?.id || '0';
    }
    return '0';
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
          <form class="customer-personal-data customer-container-item" id="customer-personal-data-form" novalidate="novalidate">
            <div class="input-container">
              <label class="input-label">Name:</label>
              <input class="personal-input address-input" type="text" value="${
                response.body.firstName || ''
              }" disabled />
            </div>
            <div class="input-container">
              <label class="input-label">Last Name:</label>
              <input class="personal-input address-input" type="text" value="${
                response.body.lastName || ''
              }" disabled />
            </div>
            <div class="input-container">
              <label class="input-label">Birth Date:</label>
              <input class="personal-input address-input" type="date" min="1900-01-01" max="2010-12-31" novalidate="novalidate" value="${
                response.body.dateOfBirth || ''
              }" disabled />
            </div>
            <div class="input-container">
              <label class="input-label">E-MAIL:</label>
              <input class="personal-input address-input" type="email" value="${response.body.email || ''}" disabled />
            </div>
            <button class="customer-personal-button" id="edit-personal-info">Edit</button>
          </form>

          <form class="customer-password customer-container-item" novalidate="novalidate">
            <div class="input-container">
              <label class="input-label">Current Password:</label>
              <input class="customer-password-input address-input" id="input-current-password"  type="password" disabled />
              <span class="icon icon-lock" id="button-current-password"><i class="bx bxs-lock-alt"></i></span>
            </div>
            <div class="input-container">
              <label class="input-label">New Password:</label>
              <input class="customer-password-input address-input" id="input-new-password" type="password" disabled />
              <span class="icon icon-lock" id="button-new-password"><i class="bx bxs-lock-alt"></i></span>
            </div>
            <button class="customer-personal-button" id="edit-password-info">Edit</button>
         </form>


         <form class="customer-default-address customer-container-item" novalidate="novalidate">
           <div class="input-container">
             <label class="input-label">Default Shipping Address</label>
             <select class="customer-address-select" id="default-shipping" disabled>
              <option id="option-shippingZ999S${defaultShippingAddress?.id || '--'}">
                ${defaultShippingAddress?.country || 'not selected'}, 
                ${defaultShippingAddress?.city || ''}, 
                ${defaultShippingAddress?.streetName || ''}, 
                ${defaultShippingAddress?.postalCode || ''}
              </option>
              ${response.body?.addresses
                ?.filter((address) => address.id !== defaultShippingAddress?.id)
                ?.map(
                  (address) => `
                  <option id="option-shippingZ999S${address.id || '--'}">
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
          <option id="option-billingZ999S${defaultBillingAddress?.id || '--'}">
            ${defaultBillingAddress?.country || 'not selected'}, 
            ${defaultBillingAddress?.city || ''}, 
            ${defaultBillingAddress?.streetName || ''}, 
            ${defaultBillingAddress?.postalCode || ''}
          </option>
          ${response.body?.addresses
            ?.filter((address) => address.id !== defaultBillingAddress?.id)
            ?.map(
              (address) => `
                <option id="option-billingZ999S${address.id || '--'}">
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
          <select class="customer-address-select" id='create-country'>
            <option>US</option>
            <option>CA</option>
          </select>
        </div>
        <div class="input-container">
          <label class="input-label">City:</label>
          <input class="address-input new-address-input" id='create-city' placeholder="City" />
        </div>
        <div class="input-container">
          <label class="input-label">Street:</label>
          <input class="address-input new-address-input" id='create-street' placeholder="Street" />
        </div>
        <div class="input-container">
          <label class="input-label">ZIP Code:</label>
          <input class="address-input new-address-input" id='create-zip' placeholder="ZIP Code" />
        </div>
        <button class="customer-personal-button save-button" id='create-address'>Add</button>
      </form>

      <div class="existing-addresses" id = "existing-addresses" > ${response.body?.addresses
        ?.map(
          (address) => `<form class="customer-address" id="address-${address.id || ''}">
              <div class="input-container">
                <label class="input-label">Country:</label>
                <select class="customer-address-select" id="select-${address.id || ''}" disabled>
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
                <button class="customer-personal-button edit-button-address" id="editZ999S${
                  address.id || ''
                }">Edit</button>
                <button class="customer-personal-button delete-button-address" id="deleteZ999S${
                  address.id || ''
                }">Delete</button>
              </div>
            </form>`,
        )
        ?.join('')}</div>`;

          customerDiv.addEventListener('click', (event) => {
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
      .catch(() => {
        TostifyHelper.showToast('A server error occurred, reload the page', Constants.TOAST_COLOR_RED);
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
