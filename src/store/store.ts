import {configureStore} from '@reduxjs/toolkit'
import {cardsApi} from "../services/CardsServise";
import {paintingsSlice} from "./reducers/paintingsSlice";
import {locationsSlice} from "./reducers/locationsSlice";
import {authorsSlice} from "./reducers/authorsSlice";
import {paginationSlice} from "./reducers/paginationSlice";
import {dateSlice} from "./reducers/dateSlice";
import {themeSlice} from "./reducers/themeSlice";


export const store = configureStore({
    reducer: {
        [cardsApi.reducerPath]: cardsApi.reducer,
        paintingsReducer:paintingsSlice.reducer,
        authorsReducer:authorsSlice.reducer,
        locationsReducer:locationsSlice.reducer,
        paginationReducer: paginationSlice.reducer,
        themeReducer: themeSlice.reducer,
        dateReducer: dateSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cardsApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export type AppStore = ReturnType<typeof store>