 import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
 import {IAuthors, ILocations, IPaintings} from "../models/IPaintings";
 import {IPages} from "../Pagination/MyPagination";



export const cardsApi = createApi({
    reducerPath: 'API/allCards',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test-front.framework.team',
    }),

    endpoints: build => ({
        getPaintings: build.query<IPaintings[],any>({
            query: ()   => ({
                url: `/paintings`,
            }),
        }),
        getAuthors: build.query<IAuthors[], string>({
            query: (authorId) => ({
                url: '/authors',
                params: {
                    authorId: authorId
                }
            }),
        }),
        getLocations: build.query<ILocations[], string>({
            query: () => ({
                url: '/locations',
            })
        }),
        getNameFilter: build.query<IPaintings[],{name?: string, authorId?: number, locationId?: number, startDate?: string, endDate?: string, limit?: number, page?: number}>({
            query: ({name = '', authorId, locationId, startDate, endDate, limit , page}) => ({
                url: `/paintings`,
                params: {
                    name_like: name,
                    authorId: authorId,
                    locationId: locationId,
                    created_gte: startDate,
                    created_lte: endDate,
                    _limit: limit,
                    _page: page
                }
            }),
        }),
    }),
})
//paintingsReducer.paintings
export const { useGetPaintingsQuery, useGetAuthorsQuery, useGetLocationsQuery, useGetNameFilterQuery} = cardsApi