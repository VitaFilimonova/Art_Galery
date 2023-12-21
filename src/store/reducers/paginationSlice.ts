import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'


export interface PagesState {
    currentPage: any;
    totalPages: number;
    limit: number;
}

const initialState: PagesState = {
    currentPage: 1,
    totalPages: 1,
    limit: 9,
}
export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
    },
});

export const {setCurrentPage, setTotalPages} = paginationSlice.actions;
export default paginationSlice.reducer