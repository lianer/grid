import { getBasicList, getChartList, getMapList } from '@/loader';
import { ComponentCategory, ComponentSchema } from '@/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface State {
  list: ComponentSchema[];
}

const initialState: State = {
  list: [],
};

export const slice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    updateList: (
      state,
      { payload }: PayloadAction<{ category: ComponentCategory }>,
    ) => {
      switch (payload.category) {
        case 'basic':
          state.list = getBasicList();
          break;
        case 'chart':
          state.list = getChartList();
          break;
        case 'map':
          state.list = getMapList();
          return;
      }
    },
  },
});

export const { updateList } = slice.actions;

export const selectMaterial = (state: RootState) => state.material.list;

export default slice.reducer;
