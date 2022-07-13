import StorageUtil from '@/lib/StorageUtil';
import {
  AttrSchema,
  ComponentSchema,
  ControlSchema,
  InstanceSchema,
} from '@/types';
import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { debounce } from 'lodash-es';
import { RootState } from './store';

export interface StageState {
  width: number; // 舞台的宽度
  height: number; // 舞台的高度
  left: number; // 舞台距离广场左侧的距离，广场指的是 contianer 的容器，假设广场里有一个舞台，舞台相对于广场的位置
  top: number; // 舞台距离广场边界的距离
  scale: number; // 缩放尺寸，0-1
  currentActive: number | null; // 选中的组件
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

const initialState: StageState = stageStorage.read() || {
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
      state.currentActive = iid;
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

    // 在 AttrEditor 中通过 changeAttr 更新 AttrsSchema
    changeAttr: (
      state,
      {
        payload,
      }: PayloadAction<{
        iid: number;
        attrName: string;
        attrValue: AttrSchema;
      }>,
    ) => {
      const target = state.children.find((item) => item.iid === payload.iid);
      if (!target) {
        console.error(`[Grid] changeAttr: 未找到 iid 为 ${payload.iid} 的元素`);
        return state;
      }

      // example: oldAttr = AttrUtils.ColorPicker
      let oldAttr = target.attrs[payload.attrName];
      if (!oldAttr) {
        console.error(
          `[Grid] changeAttr: 元素 ${target} 中不存在该属性 attrs.${payload.attrName}`,
        );
        return state;
      }

      if (oldAttr === payload.attrValue) {
        console.error(
          `[Grid] changeAttr: 不要直接修改原始对象，请提交一个新的对象 attrs.${payload.attrName}`,
        );
        return state;
      }

      const copyAttr = { ...oldAttr };

      // 采用差异化对比，而不是直接覆盖原始值，避免物料代码的问题导致 schema 结构发生变化
      for (let key in payload.attrValue) {
        if (!copyAttr.hasOwnProperty(key)) {
          console.error(
            `[Grid] changeAttr: 元素 ${target} 中不存在该属性 attrs.${payload.attrName}.${key}`,
          );
          continue;
        }
        copyAttr[key] = payload.attrValue[key];
      }

      target.attrs[payload.attrName] = copyAttr;
    },

    // 选中一个实例
    active: (state, { payload }: PayloadAction<{ iid: number }>) => {
      state.currentActive = payload.iid;
    },

    // 取消选中实例
    inactive: (state) => {
      state.currentActive = null;
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
  changeAttr,
  active,
  inactive,
  moveUp,
} = slice.actions;

export const selectChildren = (state: RootState) => {
  return state.stage.present.children;
};

type Present = RootState['stage']['present'];

export const selectPresent = <R>(selector: (state: Present) => R) => {
  return (state: RootState) => {
    return selector(state.stage.present);
  };
};

export const selectPast = (state: RootState) => {
  return state.stage.past;
};

export const selectFuture = (state: RootState) => {
  return state.stage.future;
};

// 本地存储 Redux Middleware
export const gridStorage: Middleware = function ({ getState }) {
  const delay = 300;
  const save = debounce((state) => stageStorage.save(state), delay);
  return (next) => {
    return (action) => {
      next(action);
      if (action.type.startsWith('stage/')) {
        const state = getState().stage.present;
        save(state);
      }
    };
  };
};

export default slice.reducer;
