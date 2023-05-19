import { GetUserResponse } from '@/types';
import { baseApi } from '../api';

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMe: builder.query<GetUserResponse, void>({
			query() {
				return {
					url: '/user/me',
				};
			},
			providesTags: ['User'],
		}),
	}),
});

export const { resetApiState: resetUserApi } = userApi.util;

export const { useGetMeQuery } = userApi;
