import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


export interface FilterState {
    nameFilter: string;
}

const initialState: FilterState = {
    nameFilter: ''
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setNameFilter: (state, action: PayloadAction<string>) => {
            state.nameFilter = action.payload;
        },
    },
});

export const { setNameFilter } = filterSlice.actions;
export default filterSlice.reducer