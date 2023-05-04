import { SignInDto, SignInResponse, SignUpDto, SignUpResponse } from '@/types';
import { BASE_URL } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const authBaseUrl = `${BASE_URL}/api/auth`;

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: authBaseUrl,
	}),
	tagTypes: ['Auth'],
	endpoints: (build) => ({
		signIn: build.mutation<SignInResponse, SignInDto>({
			query(body) {
				return {
					url: 'signin',
					body,
					method: 'POST',
				};
			},
		}),
		signOut: build.mutation<void, void>({
			query() {
				return {
					url: 'signout',
					method: 'POST',
				};
			},
		}),
		signUp: build.mutation<SignUpResponse, SignUpDto>({
			query(body) {
				return {
					url: 'signup',
					body,
					method: 'POST',
				};
			},
		}),
	}),
});

export const { useSignInMutation, useSignOutMutation, useSignUpMutation } =
	authApi;
