import { BaseSchema } from './types-base';
import { ControlSchema } from './types-control';

// 仅适用于组件开发时使用的类型

export type DefineSchema<C = ControlSchema, P = {}> = {
  iid?: number;

  base: BaseSchema;
  control: C;
  attrs: P;
};
