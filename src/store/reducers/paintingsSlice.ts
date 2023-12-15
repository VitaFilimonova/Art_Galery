import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IPaintings} from "../../models/IPaintings";
import {fetchPaintings} from "./ActionCreators";


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
    error: '',
    activeFilter: false,
}

export const paintingsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        filterAction: (state, action: PayloadAction<{
            paintingsus?: IPaintings[],
            author?: number,
            name?: string,
            location?: number,
            startDate?: string,
            endDate?: string,
            activeFilter?: boolean
        }>) => {
            if (action.payload.paintingsus !== undefined) {
                state.paintings = action.payload.paintingsus;
            }

            state.authorFilter = action.payload.author;
            state.locationFilter = action.payload.location;

            if (action.payload.name !== '' || action.payload.name !== undefined) {
                state.nameFilter = action.payload.name;
            }

            state.startDateFilter = action.payload.startDate;
            state.endDateFilter = action.payload.endDate;

            state.activeFilter =
                state.authorFilter !== undefined ||
                state.locationFilter !== undefined ||
                state.nameFilter !== undefined ||
                state.startDateFilter !== undefined ||
                state.endDateFilter !== undefined;
        },

    },
    extraReducers: {
        [fetchPaintings.fulfilled.type]: (state, action: PayloadAction<IPaintings[]>) => {
            state.isLoading = false;
            state.error = '';
            state.paintings = action.payload;
        },
        [fetchPaintings.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchPaintings.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const {filterAction} = paintingsSlice.actions
export default paintingsSlice.reducer