import Constants from './Constants';
import TostifyHelper from './TostifyHelper';

class PromiseHelpers {
  static catchBlockHelper(error: Error, specificMessage: string): void {
    const errorMessage: string =
      error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? specificMessage : error.message;
    TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
  }
}

export default PromiseHelpers;
