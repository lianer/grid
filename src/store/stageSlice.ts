import { BaseSchema } from '@/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type InstanceSchema = BaseSchema & {
  $iid: number;
};

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

    add: (state, { payload }: PayloadAction<{ schema: BaseSchema }>) => {
      const $iid = Date.now();
      state.children = [
        ...state.children,
        {
          ...payload.schema,
          $iid,
        },
      ];
      state.active = $iid;
    },

    active: (state, { payload }: PayloadAction<{ $iid: number }>) => {
      state.active = payload.$iid;
    },

    moveUp: (state, { payload }: PayloadAction<{ $iid: number }>) => {
      const children = [...state.children];
      const index = children.findIndex((item) => item.$iid === payload.$iid)!;
      const item = children.splice(index, 1)[0];
      children.splice(index - 1, 0, item);
      state.children = children;
    },

    // moveToTop

    // moveDown

    // moveToBottom
  },
});

export const { move, resize, scale, add, moveUp } = slice.actions;

export const selectChildren = (state: RootState) => state.stage.children;

export default slice.reducer;
