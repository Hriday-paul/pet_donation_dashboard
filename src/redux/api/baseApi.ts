
import { config } from '@/utils/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cookies } from "react-cookie";
import { IAdminStats } from '../types';

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
    baseUrl: config.clientBaseApi,
    // credentials: "include",
    prepareHeaders: (headers, { endpoint }) => {

        const authEndpoints = ['loginUser', 'verifyOtp', 'createAccount', "resendOtp", "forgotPassword", "resetPassword"];

        if (authEndpoints.includes(endpoint)) {
            const token = cookies.get("token");
            if (token) {
                headers.set("Authorization", `${token}`);
            }
        } else {
            const accessToken = cookies.get("accessToken");
            if (accessToken) {
                headers.set("Authorization", `${accessToken}`);
            }
        }

        return headers;
    },
});

// Refresh the base----------------------------------------------------------------
const baseQueryWithReauth: typeof baseQuery = async (
    args,
    api,
    extraOptions,
) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {

        const refreshToken = cookies.get("refreshToken");

        if (refreshToken) {

            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh-token",
                    method: "POST",
                    headers: {
                        token: refreshToken
                    },
                    body: { refreshToken: refreshToken },
                },
                api,
                extraOptions,
            ) as { data: { data: { accessToken: string } } };

            // Check if refreshResult contains data and accessToken
            if (refreshResult?.data && refreshResult?.data?.data?.accessToken) {

                const newAccessToken = refreshResult?.data?.data?.accessToken;

                // Save the new token
                cookies.set("accessToken", newAccessToken, {
                    httpOnly: false,
                    maxAge: 14 * 24 * 60 * 60, // 14 days
                    path: '/',
                    sameSite: 'lax',
                    secure: config.hasSSL,
                });

                // Retry the original request with the new token
                api.dispatch({
                    type: "auth/tokenRefreshed",
                    payload: newAccessToken,
                });
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Logout user if refresh token fails
                api.dispatch({ type: "auth/logout" });
            }
        } else {
            api.dispatch({ type: "auth/logout" });
            // api.dispatch(removeUser());
        }
    }

    return result;
};


const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['user', "users", "shelters", 'services', "sub_survice", "privacy", "terms", "about", "earning", "pet", "survey", "survey_answers"],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        adminStats: builder.query<{ data: IAdminStats }, {}>({
            query: (query) => ({
                url: '/dashboards/db-status',
                params: query
            }),
        }),

    })
});

export const { useAdminStatsQuery } = baseApi;
export default baseApi;