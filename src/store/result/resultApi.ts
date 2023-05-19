import {
	DeleteResultThunk,
	PatchResultResponse,
	PatchResultThunk,
} from '@/types/result';
import { baseApi } from '../api';

export const resultApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		patchResult: builder.mutation<PatchResultResponse, PatchResultThunk>({
			query(body) {
				return {
					url: `result/${body.resultId}`,
					method: 'PATCH',
					body: {
						description: body.description,
					},
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'LIST' }],
		}),
		deleteResult: builder.mutation<void, DeleteResultThunk>({
			query(body) {
				return {
					url: `result/${body.resultId}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'LIST' }],
		}),
	}),
});

export const { resetApiState: resetResultApi } = resultApi.util;

export const { useDeleteResultMutation, usePatchResultMutation } = resultApi;
