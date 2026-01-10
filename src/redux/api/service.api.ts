import { TService, TSubService } from "../types";
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

    addServicePosition: builder.mutation<
      { message: string },
      { body: any, id: string }
    >({
      query: ({ body, id }) => ({
        url: `/admin/change-position/${id}`,
        method: "PATCH",
        body,
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
      { id: string, searchTerm: string }
    >({
      query: ({ id, searchTerm }) => ({
        url: `/admin/service-base-webs/${id}`,
        params: {searchTerm }
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

    editSubService: builder.mutation<
      { message: string },
      { formData: any, service: string, subServiceId: string }
    >({
      query: ({ formData, subServiceId }) => ({
        url: `/admin/update-website/${subServiceId}`,
        method: "PATCH",
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

    addWebservicePosition: builder.mutation<
      { message: string },
      { body: any, id: string, serviceId : string }
    >({
      query: ({ id, body, serviceId }) => ({
        url: `/admin/change-service-base-web-position/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: (result, error, { serviceId }) => [{ type: "sub_survice", id : serviceId }],
    }),




    updateBanner: builder.mutation<
      { message: string },
      { id: string, body: any }
    >({
      query: ({ body, id }) => ({
        url: `/admin/update-banner/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["banner"]
    }),

    addBanner: builder.mutation<
      { message: string },
      any
    >({
      query: (formData) => ({
        url: `/admin/create-banner`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["banner"]
    }),

    deleteBanner: builder.mutation<
      { message: string },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/admin/delete-banner-info/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"]
    }),

    getBanner: builder.query<
      {
        message: string,
        data: {
          "_id": string,
          "bannerInfo": {
            "image": string,
            "websiteLink": string,
            "_id": string
          }[],
          "banner": "banner",
          "createdAt": string,
          "updatedAt": string,
          "__v": 0
        }
      },
      void
    >({
      query: () => ({
        url: `/admin/get-banner`,
      }),
      providesTags: ["banner"]
    }),


  }),
});

export const { useAllServicesQuery, useAddServiceMutation, useAddServicePositionMutation, useDeleteServiceMutation, useServiceDetailsQuery, useUpdateServiceMutation, useAddWebservicePositionMutation,
  useAllSubServicesQuery, useAddSubServiceMutation, useDeleteSubserviceMutation, useEditSubServiceMutation,
  useUpdateBannerMutation, useGetBannerQuery, useAddBannerMutation, useDeleteBannerMutation,
} = ServicesApi;
