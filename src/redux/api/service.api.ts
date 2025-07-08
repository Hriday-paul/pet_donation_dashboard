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

    serviceDetails: builder.query<
      { message: string; data: TService },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/admin/service-detail/${id}`,
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
    updateService: builder.mutation<
      { message: string },
      { body: any, id: string }
    >({
      query: ({ body, id }) => ({
        url: `/admin/update-service/${id}`,
        method: "PATCH",
        body: body,
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
      { id: string }
    //   { page: number; limit: number, searchTerm: string }
    >({
      query: ({ id }) => ({
        url: `/admin/service-base-webs/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "sub_survice", id }],
    }),

    addSubService: builder.mutation<
      { message: string },
      { formData: any, service: string }
    >({
      query: ({ formData }) => ({
        url: `/admin/add-website`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { service }) => [{ type: "sub_survice", id: service }],
    }),

    deleteSubservice: builder.mutation<
      { message: string },
      { webId: string, serviceId: string }
    >({
      query: ({ webId }) => ({
        url: `/admin/delete-website/${webId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { serviceId }) => [{ type: "sub_survice", id: serviceId }],
    }),




    updateBanner: builder.mutation<
      { message: string },
      any
    >({
      query: (formData) => ({
        url: `/admin/update-banner/banner`,
        method: "PATCH",
        body: formData,
      }),
    }),


  }),
});

export const { useAllServicesQuery, useAddServiceMutation, useDeleteServiceMutation, useServiceDetailsQuery, useUpdateServiceMutation,
  useAllSubServicesQuery, useAddSubServiceMutation, useDeleteSubserviceMutation,
  useUpdateBannerMutation
} = ServicesApi;
