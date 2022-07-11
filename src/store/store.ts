import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import undoable from 'redux-undo';
import material from './materialSlice';
import stage, { gridStorage, StageState } from './stageSlice';

export const store = configureStore({
  reducer: {
    material,
    stage: undoable<StageState>(stage),
  },

  // https://redux-toolkit.js.org/api/getDefaultMiddleware#intended-usage
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger, gridStorage);
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

// debug
(window as any).store = store;
