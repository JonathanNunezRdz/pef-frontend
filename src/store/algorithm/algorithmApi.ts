import { AlgorithmWithScale } from '@/types';
import { baseApi } from '../api';

export const algorithmApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAlgorithms: builder.query<AlgorithmWithScale[], void>({
			query() {
				return {
					url: 'algorithm',
				};
			},
			providesTags: [{ type: 'Algorithm' }],
		}),
	}),
});

export const { useGetAlgorithmsQuery } = algorithmApi;
