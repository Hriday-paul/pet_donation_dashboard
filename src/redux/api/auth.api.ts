import { IUser } from "../types";
import baseApi from "./baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation<
      {
        message: string;
        data: { otpToken: { token: string } };
      },
      {
        first_name: string,
        email: string,
        password: string,
        role: string
      }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body
      }),
    }),

    verifyOtp: builder.mutation<
      {
        message: string;
        data: { accessToken: string };
      },
      { otp: string }
    >({
      query: ({ otp }) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: { otp },
      }),
    }),

    resendOtp: builder.mutation<
      { message: string; data: { token: string } },
      void
    >({
      query: () => ({
        url: "/auth/resend-otp",
        method: "POST",
      }),
    }),

    loginUser: builder.mutation<
      {
        message: string;
        data: {
          accessToken: string;
          refreshToken: string;
          user : IUser
        };
      },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    forgotPassword: builder.mutation<
      { message: string; data: { token: string } },
      { email: string }
    >({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<
      { message: string },
      { newPassword: string; confirmPassword: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: body,
      }),
    }),

    getUserProfile: builder.query<{ message: string; data: IUser }, void>({
      query: () => ({
        url: "/user/profile",
      }),
      providesTags: ["user"],
    }),
    getProfilesByID: builder.query<
      { message: string; data: IUser },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/user/contractor/${id}`,
      }),
    }),

    changePassword: builder.mutation<
      { message: string },
      {
        current_password: string;
        new_password: string;
        confirm_password: string;
      }
    >({
      query: (data) => ({
        url: "/user/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    updateProfile: builder.mutation<{ message: string }, { data: any, id : string }>({
      query: ({ data, id }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    
  }),
});

export const {
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useGetProfilesByIDQuery,
  useCreateAccountMutation
} = AuthApi;
