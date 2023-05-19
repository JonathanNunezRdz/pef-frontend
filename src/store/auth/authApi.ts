import { SignInDto, SignInResponse, SignUpDto, SignUpResponse } from '@/types';
import { baseApi } from '../api';

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signIn: builder.mutation<SignInResponse, SignInDto>({
			query(body) {
				return {
					url: 'auth/signin',
					body,
					method: 'POST',
				};
			},
		}),
		signUp: builder.mutation<SignUpResponse, SignUpDto>({
			query(body) {
				return {
					url: 'auth/signup',
					body,
					method: 'POST',
				};
			},
		}),
	}),
});

export const { resetApiState: resetAuthApi } = authApi.util;

export const { useSignInMutation, useSignUpMutation } = authApi;
