
import { IMeta, IPet, ISurvey, ISurveyAnswers } from "../types";
import baseApi from "./baseApi";

const SurveyApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        surveyList: builder.query<
            { message: string; data: { data: ISurvey[] } },
            {}
        >({
            query: (query) => ({
                url: "/shelter/my-survey",
                params: query
            }),
            providesTags: ["survey"],
        }),

        addSurveyQues: builder.mutation<
            { message: string },
            any
        >({
            query: (formData) => ({
                url: `/shelter/create-survey`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["survey"],
        }),

        updateSurveyQues: builder.mutation<
            { message: string },
            { id: string, formData: any }
        >({
            query: ({ id, formData }) => ({
                url: `/shelter/update-survey/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["survey"],
        }),

        deleteSurveyQues: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/shelter/delete-survey/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["survey"],
        }),


        surveyAnswers: builder.query<
            { message: string; data: { data: ISurveyAnswers[], meta: IMeta } },
            {}
        >({
            query: (query) => ({
                url: "/dashboards/find-recent-adopters",
                params: query
            }),
            providesTags: ["survey_answers"],
        }),
        surveyAnswerDetails: builder.query<
            { message: string; data: ISurveyAnswers },
            { id: string }
        >({
            query: ({ id }) => ({
                url: `/dashboards/details-recent-adopters/${id}`,
            }),
            // providesTags: ["survey_answers"],
        }),


    }),
});

export const { useSurveyListQuery, useAddSurveyQuesMutation, useDeleteSurveyQuesMutation, useUpdateSurveyQuesMutation,
    useSurveyAnswersQuery, useSurveyAnswerDetailsQuery
} = SurveyApi;