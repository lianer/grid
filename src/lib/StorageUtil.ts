/**
@title Storage - 本地存储类
@description 通过 Storage 类访问本地存储，可以更好的管理 key，避免 key 的拼写错误，也可以检测出 key 的重复
@example
```
const storage = new StorageUtil({ disable: false, key: 'state.xxx' });
storage.save({ xx: 'yy' }); // 保存可序列化的数据到 WebStorage 中
storage.read(); // => 从 WebStorage 中获取数据
```
*/

class StorageUtil {
  static EXISTS_KEYS: string[] = [];

  disable: boolean;
  key: string;
  session: boolean;
  storage: Storage;

  constructor({
    key,
    disable = false,
    session = false,
  }: {
    key: string;
    disable?: boolean;
    session?: boolean;
  }) {
    if (StorageUtil.EXISTS_KEYS.includes(key)) {
      throw new Error(`[Storage] The key ${key} is duplicated`);
    }
    this.disable = disable;
    this.key = key;
    this.session = session;
    this.storage = session ? window.sessionStorage : window.localStorage;
    StorageUtil.EXISTS_KEYS.push(key);
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

export default StorageUtil;
