import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IAuthors} from "../../models/IPaintings";
import {fetchAuthors} from "./ActionCreators";

interface AuthorsState {
    authors: IAuthors[];
    isLoading: boolean;
    error: string;
}

const initialState: AuthorsState = {
    authors: [],
    isLoading: false,
    error: '',
}

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        authorFilter: (state,action: PayloadAction<{authors: IAuthors[] } > ) => {
//
state.authors = action.payload.authors
    }},
    extraReducers: {

        [fetchAuthors.fulfilled.type]: (state, action: PayloadAction<IAuthors[]>) => {

            state.isLoading = false;
            state.error = '';
            state.authors = action.payload;
        } ,
        [fetchAuthors.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchAuthors.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export default authorsSlice.reducer