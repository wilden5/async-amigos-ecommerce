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

  public getLocalStorageItem(item: string): string | null {
    try {
      return localStorage.getItem(item);
    } catch (error) {
      throw new Error(Constants.GET_LOCAL_STORAGE_ITEM_ERROR);
    }
  }
}

export default LocalStorage;
