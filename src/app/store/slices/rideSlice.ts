import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface RideState {
  rides: Ride[];
  selectedRide: Ride | null;
  loading: boolean;
  error: string | null;
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
  selectedRide: null,
  loading: false,
  error: null,
};

export const rideSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setRides: (state, action: PayloadAction<Ride[]>) => {
      state.rides = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedRide: (state, action: PayloadAction<Ride>) => {
      state.selectedRide = action.payload;
    },
    addRide: (state, action: PayloadAction<Ride>) => {
      state.rides.push(action.payload);
    },
    updateRide: (state, action: PayloadAction<Ride>) => {
      const index = state.rides.findIndex(
        (ride) => ride.id === action.payload.id
      );
      if (index !== -1) {
        state.rides[index] = action.payload;
        if (state.selectedRide?.id === action.payload.id) {
          state.selectedRide = action.payload;
        }
      }
    },
    deleteRide: (state, action: PayloadAction<string>) => {
      state.rides = state.rides.filter((ride) => ride.id !== action.payload);
      if (state.selectedRide?.id === action.payload) {
        state.selectedRide = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state: RideState) => {
      state.error = null;
    },
  },
});

export const {
  setRides,
  setSelectedRide,
  addRide,
  updateRide,
  deleteRide,
  setLoading,
  setError,
  clearError,
} = rideSlice.actions;

export const selectRides = (state: RootState) => state.rides.rides;
export const selectSelectedRide = (state: RootState) =>
  state.rides.selectedRide;
export const selectRidesLoading = (state: RootState) => state.rides.loading;
export const selectRidesError = (state: RootState) => state.rides.error;

export default rideSlice.reducer;
