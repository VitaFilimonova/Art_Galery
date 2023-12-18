import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IPaintings} from "../../models/IPaintings";
import {fetchPaintings} from "./ActionCreators";


export interface PaintingsStateTwo {
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

const initialState: PaintingsStateTwo = {
    paintings: [],
    isLoading: false,
    error: '',
    activeFilter: false,
}

export const paintingsSliceTwo = createSlice({
    name: 'cardsTwo',
    initialState,
    reducers: {
        filterAction: (state, action: PayloadAction<{ paintingsus?: IPaintings[], }>) => {

            if (action.payload.paintingsus !== undefined) {
                state.paintings = action.payload.paintingsus;
            }

            state.activeFilter =
                state.authorFilter !== undefined ||
                state.locationFilter !== undefined ||
                state.nameFilter !== undefined ||
                state.startDateFilter !== undefined ||
                state.endDateFilter !== undefined;
        },
        authorFilter: (state, action: PayloadAction<{author?: number}>) => {
            state.authorFilter = action.payload.author;
        },
        locationFilter: (state, action: PayloadAction<{location?: number}>) => {
            state.locationFilter = action.payload.location;
        },
        nameFilter: (state, action: PayloadAction<{name?: string| undefined}>) => {

            if (action.payload.name !== '' ) {
                state.nameFilter = action.payload.name;
            } else {
                state.nameFilter =  undefined
            }
        },
        dateFilter: (state, action: PayloadAction<{startDate?: string, endDate?: string }>) => {
            state.startDateFilter = action.payload.startDate;
            state.endDateFilter = action.payload.endDate;
        },
        // activeFilter: (state) => {
        //
        //     state.activeFilter =
        //         state.authorFilter !== undefined ||
        //         state.locationFilter !== undefined ||
        //         state.nameFilter !== undefined ||
        //         state.startDateFilter !== undefined ||
        //         state.endDateFilter !== undefined;
        // },
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

export const {filterAction, dateFilter, nameFilter, locationFilter  , authorFilter} = paintingsSliceTwo.actions
export default paintingsSliceTwo.reducer