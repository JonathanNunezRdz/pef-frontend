import {
	AnalysisResponse,
	GetAnalysisResponse,
	PostAnalysisDto,
	PostAnalysisResponse,
	PostAnalysisWithFileThunk,
	PostAnalysisWithUrlDto,
	SaveAnalysisDto,
	SaveAnalysisResponse,
} from '@/types';
import { GetAnalysisDto } from '@/types/analysis/get-analysis.dto';
import { BASE_URL } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';

const analysisBaseUrl = `${BASE_URL}/api/analysis`;

export const analysisApi = createApi({
	reducerPath: 'analysisApi',
	baseQuery: fetchBaseQuery({
		baseUrl: analysisBaseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) headers.set('Authorization', `Bearer ${token}`);

			return headers;
		},
	}),
	tagTypes: ['Analysis'],
	endpoints: (build) => ({
		saveAnalysis: build.mutation<SaveAnalysisResponse, SaveAnalysisDto>({
			query(body) {
				return {
					url: `save`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'RAW' }],
		}),
		addAnalysis: build.mutation<PostAnalysisResponse, PostAnalysisDto>({
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
		getAnalysis: build.query<GetAnalysisResponse, GetAnalysisDto>({
			query(body) {
				return {
					url: '',
					method: 'GET',
					params: body,
				};
			},
		}),
	}),
});

export const {
	useAddAnalysisMutation,
	useAddAnalysisWithFileMutation,
	useAddAnalysisWithUrlMutation,
	useGetAnalysisQuery,
	useSaveAnalysisMutation,
} = analysisApi;
