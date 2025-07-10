
import { IAdminStats, IMeta, IMonth, IPet } from "../types";
import baseApi from "./baseApi";

const DashboardApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        adminStats: builder.query<
            { message: string; data: IAdminStats },
            {}
        >({
            query: (query) => ({
                url: "/dashboards/total-status",
                params: query
            }),
        }),

        shelterStats: builder.query<
            { message: string; data: { totalPetDonations: number, totalPet: number } },
            {}
        >({
            query: (query) => ({
                url: "/dashboards/shelter-total-status",
                params: query
            }),
        }),

        adminUserStats: builder.query<
            { message: string; data: { monthlyJoinedUser: IMonth } },
            {}
        >({
            query: (query) => ({
                url: `/dashboards/user-status`,
                params: query
            }),
        }),

        adminShelterStats: builder.query<
            { message: string; data: { monthlyJoinedShelter: IMonth } },
            {}
        >({
            query: (query) => ({
                url: `/dashboards/shelter-status`,
                params: query
            }),
        }),

        shelterTotalPetChart: builder.query<
            { message: string; data: { monthlyPostPet: IMonth } },
            {}
        >({
            query: (query) => ({
                url: `/dashboards/pets-overview`,
                params: query
            }),
        }),

        shelterPetDonationChart: builder.query<
            { message: string; data: { monthlyDonatedPet: IMonth } },
            {}
        >({
            query: (query) => ({
                url: `/dashboards/pets-donets-overview`,
                params: query
            }),
        }),


    }),
});

export const { useAdminStatsQuery, useAdminUserStatsQuery, useAdminShelterStatsQuery, useShelterStatsQuery, useShelterTotalPetChartQuery, useShelterPetDonationChartQuery } = DashboardApi;