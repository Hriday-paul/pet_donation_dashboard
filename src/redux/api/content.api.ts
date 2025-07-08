import baseApi from "./baseApi";

const contentApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getPrivacyContents: builder.query<{ data: { title: string, description: string } }, void>({
      query: () => ({
        url: `/admin/get-privacy-policy`,
        method: "GET"
      }),
      providesTags: ['privacy'],
    }),

    updatePrivacyContent: builder.mutation<{ message: string }, string>({
      query: (data) => ({
        url: `/admin/update-privacy-policy`,
        method: "PATCH",
        body: {
          "description": data
        },
      }),
      invalidatesTags: ["privacy"],
    }),


    getAboutContents: builder.query<{ data: { title: string, description: string } }, void>({
      query: () => ({
        url: `/admin/get-about`,
        method: "GET"
      }),
      providesTags: ["about"],
    }),

    updateAboutContent: builder.mutation<{ message: string }, string>({
      query: (data) => ({
        url: `/admin/update-about`,
        method: "PATCH",
        body: {
          "description": data
        },
      }),
      invalidatesTags: ["about"],
    }),

    getTermsContents: builder.query<{ data: { title: string, description: string } }, void>({
      query: () => ({
        url: `/admin/get-terms-of-condition`,
        method: "GET"
      }),
      providesTags: ["terms"],
    }),

    updateTermsContent: builder.mutation<{ message: string }, string>({
      query: (data) => ({
        url: `/admin/update-terms-of-condition`,
        method: "PATCH",
        body: {
          "description": data
        },
      }),
      invalidatesTags: ['terms'],
    }),

  }),
});

export const { useGetPrivacyContentsQuery, useUpdatePrivacyContentMutation, useGetAboutContentsQuery, useUpdateAboutContentMutation, useGetTermsContentsQuery, useUpdateTermsContentMutation } = contentApi;
