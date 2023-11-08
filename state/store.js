import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./program/programSlice";

export const store = configureStore({
  reducer: {
    program: programReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
