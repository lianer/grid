const EXISTS_KEYS: string[] = [];

interface StoreConstructor {
  key: string;
  disable?: boolean;
  session?: boolean;
}

class Store {
  private disable: boolean;
  private key: string;
  private storage: Storage;

  constructor({ key, disable = false, session = false }: StoreConstructor) {
    if (EXISTS_KEYS.includes(key)) {
      throw new Error(`[Storage] The key ${key} is duplicated`);
    }
    this.disable = disable;
    this.key = key;
    this.storage = session ? window.sessionStorage : window.localStorage;
    EXISTS_KEYS.push(key);
  }

  save(val: {}) {
    if (!this.disable) {
      this.storage.setItem(this.key, JSON.stringify(val));
    }
  }

  read(): any {
    if (this.disable) {
      return undefined;
    } else {
      const json = this.storage.getItem(this.key);
      if (typeof json === 'string') {
        return JSON.parse(json);
      } else {
        return json;
      }
    }
  }
}

export default Store;
