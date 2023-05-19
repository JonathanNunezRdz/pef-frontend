import {
	GetAnalysisResponse,
	PostAnalysisDto,
	PostAnalysisResponse,
	PostAnalysisWithFileThunk,
	PostAnalysisWithUrlDto,
	SaveAnalysisDto,
	SaveAnalysisResponse,
	SaveAnalysisWithFileThunk,
	SaveAnalysisWithUrlDto,
} from '@/types';
import { GetAnalysisDto } from '@/types/analysis/get-analysis.dto';
import { baseApi } from '../api';

export const analysisApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAnalysis: builder.query<GetAnalysisResponse, GetAnalysisDto>({
			query(body) {
				return {
					url: 'analysis',
					method: 'GET',
					params: body,
				};
			},
			providesTags: [{ type: 'Analysis', id: 'LIST' }],
		}),
		addAnalysisWithUrl: builder.mutation<
			PostAnalysisResponse,
			PostAnalysisWithUrlDto
		>({
			query(body) {
				return {
					url: 'analysis/url',
					method: 'POST',
					body,
				};
			},
		}),
		saveAnalysisWithUrl: builder.mutation<
			SaveAnalysisResponse,
			SaveAnalysisWithUrlDto
		>({
			query(body) {
				return {
					url: 'analysis/save/url',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'LIST' }],
		}),
		addAnalysisWithFile: builder.mutation<
			PostAnalysisResponse,
			PostAnalysisWithFileThunk
		>({
			query(body) {
				const { document } = body;
				const bodyFormData = new FormData();
				// bodyFormData.append('numOfSamples', numOfSamples.toString());
				bodyFormData.append('document', document);
				return {
					url: `analysis/file`,
					method: 'POST',
					body: bodyFormData,
				};
			},
		}),
		saveAnalysisWithFile: builder.mutation<
			SaveAnalysisResponse,
			SaveAnalysisWithFileThunk
		>({
			query(body) {
				const { document, description } = body;
				const bodyFormData = new FormData();
				bodyFormData.append('document', document);
				if (description)
					bodyFormData.append('description', description);
				return {
					url: 'analysis/save/file',
					method: 'POST',
					body: bodyFormData,
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'LIST' }],
		}),
		addAnalysis: builder.mutation<PostAnalysisResponse, PostAnalysisDto>({
			query(body) {
				return {
					url: `analysis`,
					method: 'POST',
					body,
				};
			},
		}),
		saveAnalysis: builder.mutation<SaveAnalysisResponse, SaveAnalysisDto>({
			query(body) {
				return {
					url: `analysis/save`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Analysis', id: 'LIST' }],
		}),
	}),
});

export const { resetApiState: resetAnalysisApi } = analysisApi.util;

export const {
	useGetAnalysisQuery,
	useAddAnalysisWithUrlMutation,
	useSaveAnalysisWithUrlMutation,
	useAddAnalysisWithFileMutation,
	useSaveAnalysisWithFileMutation,
	useAddAnalysisMutation,
	useSaveAnalysisMutation,
} = analysisApi;
