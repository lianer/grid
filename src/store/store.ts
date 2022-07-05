import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import material from './materialSlice';
import stage, { gridStorage } from './stageSlice';

export const store = configureStore({
  reducer: {
    material,
    stage,
  },

  // https://redux-toolkit.js.org/api/getDefaultMiddleware#intended-usage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, gridStorage),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
