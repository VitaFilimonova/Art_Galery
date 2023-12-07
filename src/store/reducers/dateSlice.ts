import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IAuthors, IDates} from "../../models/IPaintings";
import {fetchAuthors} from "./ActionCreators";

interface DateState {
    dates: IDates[];
   startDate: string;
   endDate: string;
    isLoading: boolean;
    error: string;
}

const initialState: DateState = {
    dates: [],
    startDate: '',
    endDate: '',
    isLoading: false,
    error: '',
}

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        dateFilter: (state,action: PayloadAction<{startDate?:string, endDate?:string }> ) => {
            if (action.payload.startDate !==undefined) {
                state.startDate = action.payload.startDate;
            }

            if (action.payload.endDate !==undefined) {
                state.endDate = action.payload.endDate;
            }


        }},
    extraReducers: {

        // [fetchAuthors.fulfilled.type]: (state, action: PayloadAction<IAuthors[]>) => {
        //
        //     state.isLoading = false;
        //     state.error = '';
        //     state.dates = action.payload;
        // } ,
        // [fetchAuthors.pending.type]: (state) => {
        //     state.isLoading = true;
        // },
        // [fetchAuthors.rejected.type]: (state, action: PayloadAction<string>) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },

    }
})

export default dateSlice.reducer