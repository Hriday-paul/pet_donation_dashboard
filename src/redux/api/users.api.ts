import { IMeta, IUser } from "../types";
import baseApi from "./baseApi";

const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allusers: builder.query<
            { message: string; data: { meta: IMeta, data: IUser[] } },
            { }
        >({
            query: (query) => ({
                url: "/admin/get-users",
                params: query,
            }),
            providesTags: ["users"],
        }),

        block_user: builder.mutation<
            { message: string; data: { token: string } },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/admin/block-user/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["users", "shelters"],
        }),
        unblock_user: builder.mutation<
            { message: string; data: { token: string } },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/admin/unblock-user/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["users", "shelters"],
        }),

        allshelters: builder.query<
            { message: string; data: { meta: IMeta, data: IUser[] } },
            { page: number; limit: number, searchTerm: string }
        >({
            query: (query) => ({
                url: "/admin/get-shelters",
                params: query,
            }),
            providesTags: ["shelters"],
        }),







    }),
});

export const { useAllusersQuery, useBlock_userMutation, useUnblock_userMutation, useAllsheltersQuery } = UsersApi;
