import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ILocations} from "../../models/IPaintings";
import { fetchLocations} from "./ActionCreators";

export interface LocationsState {
    locations: ILocations[];
    selectedLocation: number;
    isLoading: boolean;
    error: string;
}

const initialState: LocationsState = {
    locations: [],
    isLoading: false,
    selectedLocation: 0,
    error: '',
}

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {

        locationFilter: (state,action: PayloadAction<number>) => {
            state.selectedLocation = action.payload
        },

    },
    extraReducers: {
        [fetchLocations.fulfilled.type]: (state, action: PayloadAction<ILocations[]>) => {

            state.isLoading = false;
            state.error = '';
            state.locations = action.payload;
        } ,
        [fetchLocations.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchLocations.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default locationsSlice.reducer