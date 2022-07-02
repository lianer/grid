export type Flattern<T> = {
  [K in keyof T]: T[K];
};

export enum Category {
  'basic' = 'basic',
  'chart' = 'chart',
  'map' = 'map',
}

export type BaseSchema = {
  cid: number;
  name: string;
  icon: string;
  category: Category;
};

export type DefineSchema<CONTROL = any, PROPS = any> = {
  base: BaseSchema;
  control: CONTROL;
  props: PROPS;

  // 组件在舞台中时才有的属性
  stage?: boolean;
  onCompUpdate?: (newProps: Object) => void;
};

// InstanceSchema 用于对动态加载的组件的类型描述
export type InstanceSchema = DefineSchema & { iid: number };

// 标准操作组件
export type BasicControlSchema = {
  type: 'BasicControlSchema';
  width: number;
  height: number;
  left: number;
  top: number;
};

// 高度自适应操作组件
export type AutoHeightControlSchema = {
  type: 'AutoHeightControlSchema';
  width: number;
  left: number;
  top: number;
};
