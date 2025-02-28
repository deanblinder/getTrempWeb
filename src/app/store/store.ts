import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import rideReducer from "./slices/rideSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rides: rideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
