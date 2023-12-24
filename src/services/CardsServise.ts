import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPaintings } from "../models/IPaintings";

export const cardsApi = createApi({
  reducerPath: "API/allCards",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-front.framework.team",
  }),

  endpoints: (build) => ({
    getPaintings: build.query<IPaintings[], any>({
      query: () => ({
        url: `/paintings`,
      }),
    }),
    getNameFilter: build.query<
      IPaintings[],
      {
        name?: string;
        authorId?: number;
        locationId?: number;
        startDate?: string;
        endDate?: string;
        limit?: number;
        page?: number;
      }
    >({
      query: ({
        name = "",
        authorId,
        locationId,
        startDate,
        endDate,
        limit,
        page,
      }) => ({
        url: `/paintings`,
        params: {
          name_like: name,
          authorId: authorId,
          locationId: locationId,
          created_gte: startDate,
          created_lte: endDate,
          _limit: limit,
          _page: page,
        },
      }),
    }),
  }),
});

export const { useGetPaintingsQuery, useGetNameFilterQuery } = cardsApi;
