import { SignInDto, SignInResponse } from '@/types';
import { BASE_URL } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const userBaseUrl = `${BASE_URL}/api/user`;

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: userBaseUrl,
	}),
	tagTypes: ['User'],
	endpoints: (build) => ({
		signIn: build.mutation<SignInResponse, SignInDto>({
			query(body) {
				return {
					url: ``,
				};
			},
		}),
	}),
});
