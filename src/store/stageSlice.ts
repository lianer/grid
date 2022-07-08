import StorageUtil from '@/lib/StorageUtil';
import {
  AttrsSchema,
  ComponentSchema,
  ControlSchema,
  InstanceSchema,
} from '@/types';
import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { debounce, merge } from 'lodash-es';
import { RootState } from './store';

interface State {
  width: number; // 舞台的宽度
  height: number; // 舞台的高度
  left: number; // 舞台距离广场左侧的距离，广场指的是 contianer 的容器，假设广场里有一个舞台，舞台相对于广场的位置
  top: number; // 舞台距离广场边界的距离
  scale: number; // 缩放尺寸，0-1
  active: number | null; // 选中的组件
  children: InstanceSchema[]; // 舞台中已经添加的组件
}

const stageStorage = new StorageUtil({ disable: false, key: 'state.stage' });

const center = (
  stageSize: { width: number; height: number },
  control: ControlSchema,
) => {
  switch (control.type) {
    case 'BasicControlSchema':
      return {
        ...control,
        left: (stageSize.width - (control.width ?? 100)) / 2,
        top: (stageSize.height - (control.height ?? 100)) / 2,
      };
    default:
      return control;
  }
};

const initialState: State = stageStorage.read() || {
  width: 1200,
  height: 600,
  left: 0,
  top: 0,
  scale: 1,
  children: [],
  active: null,
};

export const slice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    // 移动 Stage 的位置（相对于 Room 的位置）
    moveStage: (
      state,
      { payload }: PayloadAction<{ left: number; top: number }>,
    ) => {
      state.left = payload.left ?? state.left;
      state.top = payload.top ?? state.top;
    },

    // 舞台尺寸调整
    // width 一般建议为 100 的倍数，如：3200,2800,2400,2000,1800,1600,1400,1200,1000,800,600,400
    // height 一般建议为 10 的倍数
    resizeStage: (
      state,
      { payload }: PayloadAction<{ width: number; height: number }>,
    ) => {
      state.width = payload.width ?? state.width;
      state.height = payload.height ?? state.height;
    },

    // 舞台缩放
    scaleStage: (state, { payload }: PayloadAction<{ scale: number }>) => {
      state.scale = payload.scale;
    },

    // 实例化一个物料
    add: (state, { payload }: PayloadAction<{ schema: ComponentSchema }>) => {
      // 从侧边栏添加到舞台，添加 iid 属性，从 ComponentSchema 转变为 InstanceSchema
      const iid = Date.now();
      const control = payload.schema.control;
      const instanceSchema: InstanceSchema = {
        ...payload.schema,
        control: center({ width: state.width, height: state.height }, control),
        iid,
      };
      state.children = [...state.children, instanceSchema];
      state.active = iid;
    },

    // 在 ControlComponent 中通过 changeContorl 更新 ControlSchema
    changeControl: (
      state,
      { payload }: PayloadAction<{ iid: number; control: ControlSchema }>,
    ) => {
      const instance = state.children.find(
        (child) => child.iid === payload.iid,
      );
      if (instance) {
        // ControlSchema 与 ControlComponent 绑定，是一对一的关系，在 Redux 中并不关心 ControlSchema 的数据结构
        instance.control = { ...payload.control };
      } else {
        console.error(`[Grid] changeControl: 未找到实例 ${payload.iid}`);
      }
    },

    // 在 AttrEditor 中通过 changeAttrs 更新 AttrsSchema
    changeAttrs: (
      state,
      { payload }: PayloadAction<{ iid: number; attrs: AttrsSchema }>,
    ) => {
      state.children = state.children.map((item) => {
        if (item.iid === payload.iid) {
          const oldAttrs = { ...item.attrs };
          for (let [key, value] of Object.entries(payload.attrs)) {
            if (oldAttrs.hasOwnProperty(key)) {
              merge(oldAttrs, { [key]: value });
            } else {
              console.error(
                `[Grid] changeAttrs: 组件 %o 不存在属性 attrs.${key}`,
                {
                  ...item,
                },
              );
            }
          }
          return {
            ...item,
            attrs: oldAttrs,
          };
        }
        return item;
      });
    },

    // 选中一个实例
    active: (state, { payload }: PayloadAction<{ iid: number }>) => {
      state.active = payload.iid;
    },

    // 取消选中实例
    inactive: (state) => {
      state.active = null;
    },

    // 将实例的顺序上移
    moveUp: (state, { payload }: PayloadAction<{ iid: number }>) => {
      const children = [...state.children];
      const index = children.findIndex((item) => item.iid === payload.iid)!;
      const item = children.splice(index, 1)[0];
      children.splice(index - 1, 0, item);
      state.children = children;
    },

    // moveToTop

    // moveDown

    // moveToBottom
  },
});

export const {
  moveStage,
  resizeStage,
  scaleStage,
  add,
  changeControl,
  changeAttrs,
  active,
  inactive,
  moveUp,
} = slice.actions;

export const selectChildren = (state: RootState) => state.stage.children;

// 本地存储 Redux Middleware
export const gridStorage: Middleware = function ({ getState }) {
  const delay = 300;
  const save = debounce((state) => stageStorage.save(state), delay);
  return (next) => {
    return (action) => {
      next(action);
      if (action.type.startsWith('stage/')) {
        const state = getState().stage;
        save(state);
      }
    };
  };
};

export default slice.reducer;
