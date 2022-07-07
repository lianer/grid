import { getMaterialList } from '@/lib/loader';
import { ComponentCategory, ComponentSchema } from '@/types';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface State {
  list: ComponentSchema[];
}

const initialState: State = {
  list: [],
};

export const updateListAsync = createAsyncThunk(
  'material/getMaterialList',
  async (action: { payload: { category: ComponentCategory } }) => {
    return getMaterialList(action.payload.category);
  },
);

export const slice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    // updateList: async (
    //   state,
    //   { payload }: PayloadAction<{ category: ComponentCategory }>,
    // ) => {
    //   switch (payload.category) {
    //     case 'basic':
    //       state.list = await getBasicList();
    //       break;
    //     case 'chart':
    //       state.list = getChartList();
    //       break;
    //     case 'map':
    //       state.list = getMapList();
    //       return;
    //   }
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(updateListAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const selectMaterial = (state: RootState) => state.material.list;

export default slice.reducer;
