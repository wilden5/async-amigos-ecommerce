import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import { GetCustomerInfo } from '../../backend/customer/getCustomer';
// import Constants from '../../utils/Constants';
// import LocalStorage from '../../utils/LocalStorage';
import './MyProfilePage.scss';

class MyProfilePage extends Page {
  private MY_PROFILE_PAGE_MARKUP = `
     <h1 class='page-title'>My Profile Page</h1>
     <div class='customer' style='font-size:30px'></div>
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
            <div class='customer-name'>Name: ${response.body.firstName || ''}</div>
            <div class='customer-last-name'>Last Name: ${response.body.lastName || ''}</div>
            <div class='customer-birth-date'>Birth Date: ${response.body.dateOfBirth || '----/--/--'}</div>
          </div>

            <div class='customer-default-shipping-address'>Default Shipping Address: 
            ${
              defaultShippingAddress
                ? `<div class='customer-address-items'>
                 <div>Country: ${defaultShippingAddress.country || ''}</div>
                 <div>City: ${defaultShippingAddress.city || ''}</div>
                 <div>Street: ${defaultShippingAddress.streetName || ''}</div>
                 <div>ZIP Code: ${defaultShippingAddress.postalCode || ''}</div>
               </div>`
                : 'Address is not selected'
            }
          </div>

            <div class='customer-default-billing-address'>Default Billing Address: 
              ${
                defaultBillingAddress
                  ? `<div class='customer-address-items'>
                   <div>Country: ${defaultBillingAddress.country || ''}</div>
                   <div>City: ${defaultBillingAddress.city || ''}</div>
                   <div>Street: ${defaultBillingAddress.streetName || ''}</div>
                   <div>ZIP Code: ${defaultBillingAddress.postalCode || ''}</div>
                 </div>`
                  : 'Address is not selected'
              }
            </div>
          `;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.MY_PROFILE_PAGE_MARKUP;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.updateCustomerInfo(this.getUserId());
    return this.CONTAINER;
  }
}

export default MyProfilePage;
