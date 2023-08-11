// import Constants from './Constants';
//
// function handleLockIconClick = (event: Event): void => {
//   const target = event.currentTarget as HTMLElement;
//   const passwordInput = CONTAINER.querySelector('.input-password') as HTMLInputElement;
//
//   if (!passwordInput.value) {
//     return;
//   }
//
//   if (passwordInput.type === 'password') {
//     target.innerHTML = Constants.OPENED_LOCK_ICON_MARKUP;
//     passwordInput.type = 'text';
//   } else if (passwordInput.type === 'text') {
//     target.innerHTML = Constants.CLOSED_LOCK_ICON_MARKUP;
//     passwordInput.type = 'password';
//   }
// };
//
// private assignLoginPageEventListeners(): void {
//   const lockIcon = CONTAINER.querySelector(Constants.LOCK_ICON_SELECTOR) as HTMLElement;
//   lockIcon.addEventListener('click', handleLockIconClick);
// }
