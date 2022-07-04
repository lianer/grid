import { BaseSchema } from './types-base';
import { ControlSchema } from './types-control';

// 仅适用于组件开发时使用的类型

export type DefineSchema<C = ControlSchema, P = {}> = {
  iid?: number;

  base: BaseSchema;
  control: C;
  attrs: P;

  // 组件在舞台中时才有的属性
  stage?: boolean;
  onCompUpdate?: (_attrs: Object) => void;
};
