import { BASE_URL } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '.';

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}/api`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ['User', 'Auth', 'Analysis'],
	endpoints: () => ({}),
});

export const { resetApiState: resetAllApis } = baseApi.util;
