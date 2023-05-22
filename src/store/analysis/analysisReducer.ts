import {
	AnalysisErrorResponse,
	PostAnalysisResponse,
	SaveAnalysisResponse,
} from '@/types';
import { parseErrorResponse } from '@/utils';
import { Draft, PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from '..';
import { analysisApi } from './analysisApi';

type AnalysisState = {
	isUninitialized: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	data: SaveAnalysisResponse | PostAnalysisResponse | undefined;
	error: AnalysisErrorResponse | undefined;
	results: {
		pageSize: number;
		currentPage: number;
	};
};

const initialState: AnalysisState = {
	isUninitialized: true,
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: undefined,
	error: undefined,
	results: {
		pageSize: 2,
		currentPage: 1,
	},
};

const analysis = createSlice({
	name: 'analysis',
	initialState,
	reducers: {
		resetAnalysisReducer: () => {
			return initialState;
		},
		changePage: (state, action: PayloadAction<number>) => {
			state.results.currentPage = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addMatcher((action) => {
				return (
					analysisApi.endpoints.saveAnalysis.matchPending(action) ||
					analysisApi.endpoints.saveAnalysisWithFile.matchPending(
						action
					) ||
					analysisApi.endpoints.saveAnalysisWithUrl.matchPending(
						action
					) ||
					analysisApi.endpoints.addAnalysis.matchPending(action) ||
					analysisApi.endpoints.addAnalysisWithFile.matchPending(
						action
					) ||
					analysisApi.endpoints.addAnalysisWithUrl.matchPending(
						action
					)
				);
			}, loading)
			.addMatcher((action) => {
				return (
					analysisApi.endpoints.saveAnalysis.matchFulfilled(action) ||
					analysisApi.endpoints.saveAnalysisWithFile.matchFulfilled(
						action
					) ||
					analysisApi.endpoints.saveAnalysisWithUrl.matchFulfilled(
						action
					) ||
					analysisApi.endpoints.addAnalysis.matchFulfilled(action) ||
					analysisApi.endpoints.addAnalysisWithFile.matchFulfilled(
						action
					) ||
					analysisApi.endpoints.addAnalysisWithUrl.matchFulfilled(
						action
					)
				);
			}, succeeded)
			.addMatcher(
				isAnyOf(
					analysisApi.endpoints.saveAnalysis.matchRejected ||
						analysisApi.endpoints.saveAnalysisWithFile
							.matchRejected ||
						analysisApi.endpoints.saveAnalysisWithUrl
							.matchRejected ||
						analysisApi.endpoints.addAnalysis.matchRejected,
					analysisApi.endpoints.addAnalysisWithFile.matchRejected,
					analysisApi.endpoints.addAnalysisWithUrl.matchRejected
				),
				(state, action) => {
					let parsedError: AnalysisErrorResponse;
					if (action.payload) {
						parsedError = parseErrorResponse(action.payload);
					} else {
						parsedError = parseErrorResponse(action.error);
					}
					state.data = undefined;
					state.error = parsedError;
					state.isError = true;
					state.isLoading = false;
					state.isSuccess = false;
					state.isUninitialized = false;
				}
			);
	},
});

const loading = (state: Draft<AnalysisState>) => {
	state.data = undefined;
	state.error = undefined;
	state.isError = false;
	state.isLoading = true;
	state.isSuccess = false;
	state.isUninitialized = false;
};

const succeeded = (
	state: Draft<AnalysisState>,
	action: PayloadAction<SaveAnalysisResponse | PostAnalysisResponse>
) => {
	state.data = action.payload;
	state.error = undefined;
	state.isError = false;
	state.isLoading = false;
	state.isSuccess = true;
	state.isUninitialized = false;
};

export const { resetAnalysisReducer, changePage } = analysis.actions;

export default analysis.reducer;

export const selectAnalysisStatus = (state: RootState) => state.analysis;
export const selectAnalysisResults = (state: RootState) =>
	state.analysis.results;
