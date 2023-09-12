import Toastify from 'toastify-js';

class ToastifyHelper {
  static showToast(message: string, hexToastColor: string): void {
    Toastify({
      text: message,
      duration: 4000,
      gravity: 'bottom',
      style: {
        background: hexToastColor,
      },
      offset: {
        x: 10,
        y: 10,
      },
    }).showToast();
  }
}

export default ToastifyHelper;
