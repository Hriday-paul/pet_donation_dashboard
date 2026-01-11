
import { IMeta, IPet } from "../types";
import baseApi from "./baseApi";

const PetApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        petList: builder.query<
            { message: string; data: { data: IPet[], meta: IMeta} },
            {}
        >({
            query: (query) => ({
                url: "/pets/my-pets",
                params: query
            }),
            providesTags: ["pet"],
        }),

        addPet: builder.mutation<
            { message: string },
            any
        >({
            query: (formData) => ({
                url: `/pets/create-pet`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["pet"],
        }),

        updatePet: builder.mutation<
            { message: string },
            { id: string, formData: any }
        >({
            query: ({ id, formData }) => ({
                url: `/pets/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["pet"],
        }),

        deletePet: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/pets/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["pet"],
        }),

        deletePetImage: builder.mutation<
            { message: string },
            {id : string, url : string}
        >({
            query: ({id, url}) => ({
                url: `/pets/petImg/${id}`,
                method: "DELETE",
                body : {img : url}
            }),
            invalidatesTags: ["pet"],
        }),

        deletePetReport: builder.mutation<
            { message: string },
            {id : string, report : string}
        >({
            query: ({id, report}) => ({
                url: `/pets/petReport/${id}`,
                method: "DELETE",
                body : {report : report}
            }),
            invalidatesTags: ["pet"],
        }),


    }),
});

export const { useAddPetMutation, useDeletePetMutation, usePetListQuery, useUpdatePetMutation, useDeletePetImageMutation, useDeletePetReportMutation } = PetApi;