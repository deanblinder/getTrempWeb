import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NotificationState {
  shouldShowNotification: boolean;
}

const initialState: NotificationState = {
  shouldShowNotification: true,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setShowNotification: (state, action: PayloadAction<boolean>) => {
      state.shouldShowNotification = action.payload;
    },
    toggleNotification: (state) => {
      state.shouldShowNotification = !state.shouldShowNotification;
    },
  },
});

export const { setShowNotification, toggleNotification } =
  notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export const notificationReducer = notificationSlice.reducer;
