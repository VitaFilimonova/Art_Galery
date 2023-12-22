import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ILocations} from "../../models/IPaintings";
import {fetchLocations} from "./ActionCreators";

export interface LocationsState {
    locations: ILocations[];
    isLoading: boolean;
    error: string;
}

const initialState: LocationsState = {
    locations: [],
    isLoading: false,
    error: '',
}

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        locationFilter: (state, action: PayloadAction<{ locations: ILocations[] }>) => {
            state.locations = action.payload.locations
        },

    },
    extraReducers: {
        [fetchLocations.fulfilled.type]: (state, action: PayloadAction<ILocations[]>) => {

            state.isLoading = false;
            state.error = '';
            state.locations = action.payload;
        },
        [fetchLocations.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchLocations.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})
