import baseApi from "./baseApi";

const contentApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getPrivacyContents: builder.query<{data : {title : string, description : string}}, void>({
      query: () => ({
        url: `/admin/get-privacy-policy`,
        method: "GET"
      }),
      providesTags: ['privacy'],
    }),

    updatePrivacyContent: builder.mutation({
      query: (data) => ({
        url: `/settings/update`,
        method: "PATCH",
        body: {
          "label": "privacy",// about, privacy, 
          "content": data
        },
      }),
      invalidatesTags: ["privacy"],
    }),


    getAboutContents: builder.query<{data : {title : string, description : string}}, void>({
      query: () => ({
        url: `/admin/get-about`,
        method: "GET"
      }),
      providesTags: ["about"],
    }),

    updateAboutContent: builder.mutation({
      query: (data) => ({
        url: `/settings/update`,
        method: "PATCH",
        body: {
          "label": "about",// about, privacy, 
          "content": data
        },
      }),
      invalidatesTags: ["about"],
    }),

    getTermsContents: builder.query<{data : {title : string, description : string}}, void>({
      query: () => ({
        url: `/admin/get-terms-of-condition`,
        method: "GET"
      }),
      providesTags: ["terms"],
    }),

    updateTermsContent: builder.mutation({
      query: (data) => ({
        url: `/settings/update`,
        method: "PATCH",
        body: {
          "label": "terms",// about, privacy, 
          "content": data
        },
      }),
      invalidatesTags: ['terms'],
    }),

  }),
});

export const { useGetPrivacyContentsQuery, useUpdatePrivacyContentMutation, useGetAboutContentsQuery, useUpdateAboutContentMutation, useGetTermsContentsQuery, useUpdateTermsContentMutation } = contentApi;
