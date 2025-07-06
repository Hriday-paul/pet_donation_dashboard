import { IMeta, IUser } from "../types";
import baseApi from "./baseApi";

const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allusers: builder.query<
            { message: string; data: { meta: IMeta, data: IUser[] } },
            { page: number; limit: number, searchTerm: string }
        >({
            query: (query) => ({
                url: "/admin/get-users",
                params: query,
            }),
            providesTags: ["users"],
        }),

        block_unblock_user: builder.mutation<
            { message: string; data: { token: string } },
            { id: string; updatedData: { isActive : boolean } }
        >({
            query: ({ id, updatedData }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                body: updatedData,
            }),
            invalidatesTags: ["users"],
        }),






    }),
});

export const { useAllusersQuery, useBlock_unblock_userMutation } = UsersApi;
