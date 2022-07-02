import { DefineSchema, InstanceSchema } from '@/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash-es';
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

const initialState: State = {
  width: 1200,
  height: 800,
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
    move: (
      state,
      { payload }: PayloadAction<{ left: number; top: number }>,
    ) => {
      state.left = payload.left ?? state.left;
      state.top = payload.top ?? state.top;
    },

    resize: (
      state,
      { payload }: PayloadAction<{ width: number; height: number }>,
    ) => {
      state.width = payload.width ?? state.width;
      state.height = payload.height ?? state.height;
    },

    scale: (state, { payload }: PayloadAction<{ scale: number }>) => {
      state.scale = payload.scale;
    },

    add: (state, { payload }: PayloadAction<{ schema: DefineSchema }>) => {
      // 从侧边栏添加到舞台，添加 iid 属性，从 DefineSchema 转变为 InstanceSchema
      const iid = Date.now();
      const instanceSchema: InstanceSchema = {
        ...payload.schema,
        iid,
      };
      state.children = [...state.children, instanceSchema];
      state.active = iid;
    },

    changeProps: (
      state,
      { payload }: PayloadAction<{ iid: number; props: DefineSchema }>,
    ) => {
      state.children = state.children.map((item) => {
        if (item.iid === payload.iid) {
          const props = { ...item.props };
          for (let [key, value] of Object.entries(payload.props)) {
            if (props.hasOwnProperty(key)) {
              merge(props, { [key]: value });
            } else {
              console.error(`changeProps: 组件 %o 不存在属性 props.${key}`, {
                ...item,
              });
            }
          }
          return {
            ...item,
            props,
          };
        }
        return item;
      });
    },

    active: (state, { payload }: PayloadAction<{ iid: number }>) => {
      state.active = payload.iid;
    },

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

export const { move, resize, scale, add, changeProps, moveUp } = slice.actions;

export const selectChildren = (state: RootState) => state.stage.children;

export default slice.reducer;
