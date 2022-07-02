export type Flattern<T> = {
  [K in keyof T]: T[K];
};

export type MergeSchema<T, K, V> = Flattern<T & K & V>;

export enum Category {
  'basic' = 'basic',
  'chart' = 'chart',
  'map' = 'map',
}

export type BaseSchema = {
  $id: number;
  $name: string;
  $icon: string;
  $category: Category;
  $control: Control;
};

export enum Control {
  'basic' = 'basic',
}

// 标准操作组件
export type StandardOperatorSchema = {
  $width: number;
  $height: number;
  $left: number;
  $top: number;
};
