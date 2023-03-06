import { AnalysisResponse, PostAnalysisDto } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const analysisApi = createApi({
	reducerPath: 'analysisApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4200/api/analysis',
	}),
	tagTypes: ['Analysis'],
	endpoints: (build) => ({
		addAnalysis: build.mutation<AnalysisResponse, PostAnalysisDto>({
			query(body) {
				return {
					url: ``,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'LIST' }],
		}),
	}),
});

export const { useAddAnalysisMutation } = analysisApi;
