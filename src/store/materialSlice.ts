import { Category, DefineSchema } from '@/interface';
import { getBasicList, getChartList, getMapList } from '@/loader';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface State {
  list: DefineSchema[];
}

const initialState: State = {
  list: [],
};

export const slice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    updateList: (state, { payload }: PayloadAction<{ category: Category }>) => {
      switch (payload.category) {
        case Category.basic:
          state.list = getBasicList();
          break;
        case Category.chart:
          state.list = getChartList();
          break;
        case Category.map:
          state.list = getMapList();
          return;
      }
    },
  },
});

export const { updateList } = slice.actions;

export const selectMaterial = (state: RootState) => state.material.list;

export default slice.reducer;
