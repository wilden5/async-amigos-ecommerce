import Constants from './Constants';

class LocalStorage {
  public setLocalStorageItem(item: string, value: string): void {
    localStorage.setItem(item, value);
  }

  public isLocalStorageItemExists(item: string): boolean {
    try {
      const value = localStorage.getItem(item);
      return value !== null;
    } catch (error) {
      return false;
    }
  }

  public removeLocalStorageItem(item: string): void {
    try {
      localStorage.removeItem(item);
    } catch (error) {
      throw new Error(Constants.REMOVE_LOCAL_STORAGE_ITEM_ERROR);
    }
  }
}

export default LocalStorage;
