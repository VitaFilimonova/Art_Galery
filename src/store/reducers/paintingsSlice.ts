import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IPaintings} from "../../models/IPaintings";
import {fetchPaintings} from "./ActionCreators";


export interface PaintingsState {
    paintings: IPaintings[];
    isLoading: boolean;
    error: string;
    pages: object;
    nameFilter?: string;
    authorFilter?: number | undefined;
    locationFilter?: number | undefined;
    startDateFilter?: string;
    endDateFilter?: string;
}

const initialState: PaintingsState = {
    paintings: [],
    isLoading: false,
    error: '',
    pages: {},
    nameFilter: '',
    // startDateFilter: '',
    // endDateFilter: ''
}

export const paintingsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        filterAction: (state, action: PayloadAction<{ paintingsus?: IPaintings[], author?: number, name?: string, location?: number, startDate?: string, endDate?: string }>) => {
            if (action.payload.paintingsus !== undefined) {
                state.paintings = action.payload.paintingsus;
console.log(state.paintings.length)
            }

            // if (action.payload.author !== undefined) {
                state.authorFilter = action.payload.author;
                // console.log('auth')
            // }

            // if (action.payload.location !== undefined ) {
                state.locationFilter = action.payload.location;
                // console.log('loca')
            // }

            if (action.payload.name !== '' && action.payload.name !== undefined ) {
                state.nameFilter = action.payload.name;
            }
            // if (action.payload.name !== '') {
            //     state.locationFilter = action.payload.location;
            // }
            if (action.payload.startDate !== undefined && action.payload.startDate !== '') {
                state.startDateFilter = action.payload.startDate;
            }

            if (action.payload.endDate !== undefined && action.payload.endDate !== '') {
                state.endDateFilter = action.payload.endDate;
            }


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