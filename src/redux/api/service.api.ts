import { error } from "console";
import { IUser, TService, TSubService } from "../types";
import baseApi from "./baseApi";

const ServicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allServices: builder.query<
      { message: string; data: TService[] },
      {}
    //   { page: number; limit: number, searchTerm: string }
    >({
      query: (query) => ({
        url: "/admin/get-service",
        params: query,
      }),
      providesTags: ["services"],
    }),
    addService: builder.mutation<
      { message: string },
      any
    >({
      query: (formData) => ({
        url: `/admin/create-service`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation<
      { message: string },
      string
    >({
      query: (id) => ({
        url: `/admin/delete-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),



    allSubServices: builder.query<
      { message: string; data: TSubService[] },
      {id : string}
    //   { page: number; limit: number, searchTerm: string }
    >({
      query: ({id}) => ({
        url: `/sub-services/${id}`,
      }),
      providesTags: (result, error, {id})=>[{type : "sub_survice", id}],
    }),

    addSubService: builder.mutation<
      { message: string },
      {formData : any, service : string}
    >({
      query: ({formData}) => ({
        url: `/admin/add-website`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, {service})=>[{type : "sub_survice", id : service}],
    }),


  }),
});

export const { useAllServicesQuery, useAddServiceMutation, useDeleteServiceMutation,
    useAllSubServicesQuery, useAddSubServiceMutation
 } = ServicesApi;
