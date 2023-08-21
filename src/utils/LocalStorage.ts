class LocalStorage {
  public setLocalStorageItem(item: string, value: string): void {
    localStorage.setItem(item, value);
  }

  public isLocalStorageItemExists(item: string): boolean {
    try {
      const value = localStorage.getItem(item);
      return value !== null;
    } catch (error) {
      console.error('Error checking local storage:', error);
      return false;
    }
  }
}

export default LocalStorage;
