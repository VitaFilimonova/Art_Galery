import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPaintings } from "../../models/IPaintings";
import { fetchPaintings } from "./ActionCreators";

export interface PaintingsState {
  paintings: IPaintings[];
  isLoading: boolean;
  error: string;
  nameFilter?: string | undefined;
  authorFilter?: number | undefined;
  locationFilter?: number | undefined;
  startDateFilter?: string;
  endDateFilter?: string;
  activeFilter?: boolean;
}

const initialState: PaintingsState = {
  paintings: [],
  isLoading: false,
  error: "",
  activeFilter: false,
};

export const paintingsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    filterAction: (
      state,
      action: PayloadAction<{ paintings?: IPaintings[] }>,
    ) => {
      if (action.payload.paintings !== undefined) {
        state.paintings = action.payload.paintings;
      }

      state.activeFilter =
        state.authorFilter !== undefined ||
        state.locationFilter !== undefined ||
        state.nameFilter !== undefined ||
        state.startDateFilter !== undefined ||
        state.endDateFilter !== undefined;
    },
    nameFilter: (
      state,
      action: PayloadAction<{ name?: string | undefined }>,
    ) => {
      if (action.payload.name !== "") {
        state.nameFilter = action.payload.name;
      } else {
        state.nameFilter = undefined;
      }
    },
    authorFilter: (state, action: PayloadAction<{ author?: number }>) => {
      state.authorFilter = action.payload.author;
    },
    locationFilter: (state, action: PayloadAction<{ location?: number }>) => {
      state.locationFilter = action.payload.location;
    },
    dateFilter: (
      state,
      action: PayloadAction<{ startDate?: string; endDate?: string }>,
    ) => {
      state.startDateFilter = action.payload.startDate;
      state.endDateFilter = action.payload.endDate;
    },
    activeFilter: (state) => {
      state.activeFilter =
        state.authorFilter !== undefined ||
        state.locationFilter !== undefined ||
        state.nameFilter !== undefined ||
        state.startDateFilter !== undefined ||
        state.endDateFilter !== undefined;
    },
  },
  extraReducers: {
    [fetchPaintings.fulfilled.type]: (
      state,
      action: PayloadAction<IPaintings[]>,
    ) => {
      state.isLoading = false;
      state.error = "";
      state.paintings = action.payload;
    },
    [fetchPaintings.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPaintings.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
