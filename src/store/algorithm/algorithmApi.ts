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
		}),
	}),
});

export const { useGetAlgorithmsQuery } = algorithmApi;
