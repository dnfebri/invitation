import { configureStore } from "@reduxjs/toolkit";
import counterReducers from "./reducers/countSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
