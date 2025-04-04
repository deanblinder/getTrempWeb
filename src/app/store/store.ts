import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { notificationReducer } from "./slices/notificationSlice";
import { rideReducer } from "./slices/rideSlice";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rides: rideReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
