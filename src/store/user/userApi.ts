import { GetUserResponse } from '@/types';
import { BASE_URL } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '..';

const userBaseUrl = `${BASE_URL}/api/user`;

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: userBaseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ['User'],
	endpoints: (build) => ({
		getMe: build.query<GetUserResponse, void>({
			query() {
				return {
					url: 'me',
				};
			},
		}),
	}),
});

export const { useGetMeQuery } = userApi;
