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
};

export type AttrSchema = Record<PropertyKey, any>;
export type AttrsSchema = Record<PropertyKey, AttrSchema>;
