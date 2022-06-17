import {configureStore} from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';

const store = configureStore({
  reducer: {
    colors: themeSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
