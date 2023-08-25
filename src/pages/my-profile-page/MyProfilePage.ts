import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import { GetCustomerInfo } from '../../backend/customer/getCustomer';

class MyProfilePage extends Page {
  private MY_PROFILE_PAGE_MARKUP = `
     <h1 class='page-title'>My Profile</h1>
     <div class='customer'></div>
     `;

  constructor() {
    super(ProjectPages.MyProfile);
  }

  private getUserId(): string {
    return localStorage.getItem('registration-successful')?.replace(/"/g, '') ?? '';
  }

  private updateCustomerInfo(customerId: string): void {
    const customerInfoGetter = new GetCustomerInfo(customerId);

    customerInfoGetter
      .getProfileInfo()
      .then((response) => {
        const customerDiv = this.CONTAINER.querySelector('.customer');

        if (response.statusCode === 200 && customerDiv) {
          const defaultShippingAddress = response.body.addresses.find(
            (item) => item.id === response.body.defaultShippingAddressId,
          );
          const defaultBillingAddress = response.body.addresses.find(
            (item) => item.id === response.body.defaultBillingAddressId,
          );

          customerDiv.innerHTML = `
          <div class='customer-personal-data'>
            <div class='customer-name'><span>Name:</span> ${response.body.firstName || ''}</div>
            <div class='customer-last-name'><span>Last Name:</span> ${response.body.lastName || ''}</div>
            <div class='customer-birth-date'><span>Birth Date:</span> ${response.body.dateOfBirth || '----/--/--'}</div>
          </div>

            <div class='customer-default-shipping-address'><span>Default Shipping Address</span> 
              ${
                defaultShippingAddress
                  ? `<div class='customer-address-items'>
                 <div><span>Country:</span> ${defaultShippingAddress.country || '--'}</div>
                 <div><span>City:</span> ${defaultShippingAddress.city || '--'}</div>
                 <div><span>Street:</span> ${defaultShippingAddress.streetName || '--'}</div>
                 <div><span>ZIP Code:</span> ${defaultShippingAddress.postalCode || '--'}</div>
            </div>`
                  : `<div class='customer-address-items'>Address is not selected</div>`
              }
             </div>

            <div class='customer-default-billing-address'><span>Default Billing Address</span> 
              ${
                defaultBillingAddress
                  ? `<div class='customer-address-items'>
                   <div><span>Country:</span> ${defaultBillingAddress.country || '--'}</div>
                   <div><span>City:</span> ${defaultBillingAddress.city || '--'}</div>
                   <div><span>Street:</span> ${defaultBillingAddress.streetName || '--'}</div>
                   <div><span>ZIP Code:</span> ${defaultBillingAddress.postalCode || '--'}</div>
                 </div>`
                  : `<div class='customer-address-items'>Address is not selected</div>`
              }
          </div>
          
          <table class='customer-address-table'>
          <tr class='customer-description-row'>
            <td>Country</td>
            <td>City</td>
            <td>Street</td>
            <td>ZIP Code</td>
          </tr>
          ${response.body?.addresses
            .filter((address) => address.id !== defaultShippingAddress?.id && address.id !== defaultBillingAddress?.id)
            .map(
              (address) => `
              <tr class='customer-address-row'>
                <td class='customer-address-item'>${address.country || ''}</td>
                <td class='customer-address-item'>${address.city || ''}</td>
                <td class='customer-address-item'>${address.streetName || ''}</td>
                <td class='customer-address-item'>${address.postalCode || ''}</td>
              </tr>
            `,
            )
            .join('')}
        </table>
          `;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.MY_PROFILE_PAGE_MARKUP;
    this.updateCustomerInfo(this.getUserId());
    return this.CONTAINER;
  }
}

export default MyProfilePage;
