export type Flattern<T> = {
  [K in keyof T]: T[K];
};

// 组件类型
export type ComponentCategory = 'basic' | 'chart' | 'map';

// 通用类型
export type BaseSchema = {
  cid: number;
  name: string;
  icon: string;
  category: ComponentCategory;

  // 组件在舞台中时才有的属性
  stage?: boolean;
  onCompUpdate?: (_attrs: Object) => void;
};

export type AttrsSchema = Record<PropertyKey, any>;
