import { BaseSchema, Category } from '@/interface';
import { schema as imageSchema } from '@/materials/Image';
import { schema as textSchema } from '@/materials/Text';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface State {
  list: BaseSchema[];
}

const initialState: State = {
  list: [],
};

const getBasicList = () => {
  const list = [textSchema, imageSchema];
  return JSON.parse(JSON.stringify(list));
};
const getChartList = () => {
  return [];
};
const getMapList = () => {
  return [];
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
