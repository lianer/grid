import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import material from './materialSlice';
import stage from './stageSlice';

export const store = configureStore({
  reducer: {
    material,
    stage,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
