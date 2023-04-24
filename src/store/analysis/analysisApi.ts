import {
	AnalysisResponse,
	PostAnalysisDto,
	PostAnalysisWithFileThunk,
	PostAnalysisWithUrlDto,
} from '@/types';
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
			invalidatesTags: [{ type: 'Analysis', id: 'RAW' }],
		}),
		addAnalysisWithFile: build.mutation<
			AnalysisResponse,
			PostAnalysisWithFileThunk
		>({
			query(body) {
				const { document } = body;
				const bodyFormData = new FormData();
				// bodyFormData.append('numOfSamples', numOfSamples.toString());
				bodyFormData.append('document', document);
				return {
					url: `file`,
					method: 'POST',
					body: bodyFormData,
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'FILE' }],
		}),
		addAnalysisWithUrl: build.mutation<
			AnalysisResponse,
			PostAnalysisWithUrlDto
		>({
			query(body) {
				return {
					url: 'url',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'URL' }],
		}),
	}),
});

export const {
	useAddAnalysisMutation,
	useAddAnalysisWithFileMutation,
	useAddAnalysisWithUrlMutation,
} = analysisApi;
