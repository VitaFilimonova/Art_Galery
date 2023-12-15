import {IAuthors, ILocations, IPaintings} from "../../models/IPaintings";
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPaintings = createAsyncThunk(
    'paintings/fetchAll',
    async (_, thunckAPI) => {
        try {
            const response = await axios.get<IPaintings[]>('https://test-front.framework.team/paintings')
            return response.data
        } catch (e) {
            return thunckAPI.rejectWithValue('Failed to load pictures...')
        }

    }
)
export const fetchAuthors = createAsyncThunk(
    'authors/fetchAll',
    async (_, thunckAPI) => {
        try {
            const response = await axios.get<IAuthors[]>('https://test-front.framework.team/authors')
            return response.data
        } catch (e) {
            return thunckAPI.rejectWithValue('Failed to load authors...')
        }
    }
)
export const fetchLocations = createAsyncThunk(
    'locations/fetchAll',
    async (_, thunckAPI) => {
        try {
            const response = await axios.get<ILocations[]>('https://test-front.framework.team/locations')
            return response.data
        } catch (e) {
            return thunckAPI.rejectWithValue('Failed to load locations...')
        }
    }
)