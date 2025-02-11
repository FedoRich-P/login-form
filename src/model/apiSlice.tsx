import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {User, UserSchema} from "./schemas.ts";

const API_BASE_URL = 'http://localhost:4000';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUser: builder.query<User, string>({
            query: (id) => `/api/users/${id}`,
            transformResponse: (response: unknown) => UserSchema.parse(response),
        }),

        registerUser: builder.mutation<void, { username: string; password: string }>({
            query: (body) => ({
                url: '/api/register',
                method: 'POST',
                body,
            }),
        }),

        login: builder.mutation<void, { username: string; password: string }>({
            query: (body) => ({
                url: '/api/login',
                method: 'POST',
                body,
            }),
        }),

        fetchMe: builder.query<User, void>({
            query: () => '/api/users/me',
            transformResponse: (response: unknown) => UserSchema.parse(response),
            providesTags: ['User'],
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useFetchUserQuery,
    useRegisterUserMutation,
    useLoginMutation,
    useFetchMeQuery,
    useLogoutMutation,
} = api;
