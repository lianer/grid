import { AttrsSchema, BaseSchema } from './types-base';
import { ControlSchema } from './types-control';

// 仅适用于编辑器开发时使用的类型

// 组件描述信息（仅适用于 Stage 开发模式下，组件开发模式下没有这个）
export type ComponentSchema = {
  base: BaseSchema;
  control: ControlSchema;
  attrs: AttrsSchema;
};

// InstanceSchema 用于对动态加载的组件的类型描述
export type InstanceSchema = {
  iid: number;
  base: BaseSchema;
  control: ControlSchema;
  attrs: AttrsSchema;
};
