import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RideState {
  rides: Ride[];
}

interface Ride {
  id: string;
  driverId: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  price: number;
  description?: string;
}

const initialState: RideState = {
  rides: [],
};

export const rideSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setRides: (state, action: PayloadAction<Ride[]>) => {
      state.rides = action.payload;
    },
  },
});

export const { setRides } = rideSlice.actions;

export const rideReducer = rideSlice.reducer;
