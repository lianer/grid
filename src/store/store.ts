import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import material from './materialSlice';

export const store = configureStore({
  reducer: {
    material,
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
