import Toastify from 'toastify-js';

class ToastifyHelper {
  static showToast(message: string, hexToastColor: string): void {
    Toastify({
      text: message,
      duration: 5000,
      style: {
        background: hexToastColor,
      },
    }).showToast();
  }
}
export default ToastifyHelper;
