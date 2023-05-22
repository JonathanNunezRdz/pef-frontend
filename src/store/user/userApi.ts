import { GetUserResponse, PatchUserDto, PatchUserResponse } from '@/types';
import { ChangePasswordDto } from '@/types/user/change-password.dto';
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
		editUser: builder.mutation<PatchUserResponse, PatchUserDto>({
			query(body) {
				return {
					url: '/user',
					method: 'PATCH',
					body,
				};
			},
			invalidatesTags: ['User'],
		}),
		changePassword: builder.mutation<void, ChangePasswordDto>({
			query(body) {
				return {
					url: '/user/change_password',
					method: 'PATCH',
					body,
				};
			},
		}),
	}),
});

export const { resetApiState: resetUserApi } = userApi.util;

export const { useGetMeQuery, useEditUserMutation, useChangePasswordMutation } =
	userApi;
