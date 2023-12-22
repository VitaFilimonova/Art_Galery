import {configureStore} from '@reduxjs/toolkit'
import {cardsApi} from "../services/CardsServise";
import {paintingsSlice} from "./reducers/paintingsSlice";
import {locationsSlice} from "./reducers/locationsSlice";
import {authorsSlice} from "./reducers/authorsSlice";
import {paginationSlice} from "./reducers/paginationSlice";
import {themeSlice} from "./reducers/themeSlice";

export const store = configureStore({
    reducer: {
        [cardsApi.reducerPath]: cardsApi.reducer,
        paintingsReducer:paintingsSlice.reducer,
        authorsReducer:authorsSlice.reducer,
        locationsReducer:locationsSlice.reducer,
        paginationReducer: paginationSlice.reducer,
        themeReducer: themeSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cardsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

