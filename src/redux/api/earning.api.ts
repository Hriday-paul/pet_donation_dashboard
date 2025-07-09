import { IEarning, IMeta } from "../types";
import baseApi from "./baseApi";

const EarningApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        earningsCount: builder.query<
            { message: string; data: { todayEarnings: number, totalEarning: number } },
            void
        >({
            query: () => ({
                url: "/earning/earning-status",
            }),
            providesTags: ["earning"],
        }),

        earningList: builder.query<
            { message: string; data: { meta: IMeta, data: IEarning[] } },
            {}
        >({
            query: (query) => ({
                url: "/earning/all-earnings",
                params: query
            }),
            providesTags: ["earning"],
        }),

        addEarning: builder.mutation<
            { message: string },
            { clientName: string, amount: number, transactionDate: string }
        >({
            query: (body) => ({
                url: `/earning/create-earning`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["earning"],
        }),


        deleteEarning: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/earning/delete-earning/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["earning"],
        }),


    }),
});

export const { useAddEarningMutation, useDeleteEarningMutation, useEarningsCountQuery, useEarningListQuery } = EarningApi;