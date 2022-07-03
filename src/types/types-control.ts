// 操作组件
export type ControlSchema = BasicControlSchema | AutoHeightControlSchema;

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
