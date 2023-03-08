import { AnalysisResponse, PostAnalysisDto } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200';

const analysisBaseUrl = `${BASE_URL}/api/analysis`;

export const analysisApi = createApi({
	reducerPath: 'analysisApi',
	baseQuery: fetchBaseQuery({
		baseUrl: analysisBaseUrl,
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
