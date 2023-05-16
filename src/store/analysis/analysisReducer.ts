import { HttpError, PostAnalysisResponse, SaveAnalysisResponse } from '@/types';
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { analysisApi } from './analysisApi';

type AnalysisState = {
	isUninitialized: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	data: SaveAnalysisResponse | PostAnalysisResponse | undefined;
	error: HttpError | undefined;
};

const initialState: AnalysisState = {
	isUninitialized: true,
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: undefined,
	error: undefined,
};

const analysis = createSlice({
	name: 'analysis',
	initialState,
	reducers: {
		analysisRejected: (
			state,
			action: PayloadAction<{ error: HttpError }>
		) => {
			state.data = undefined;
			state.error = action.payload.error;
			state.isError = true;
			state.isLoading = false;
			state.isSuccess = false;
			state.isUninitialized = false;
		},
		resetAnalysis: () => {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addMatcher((action) => {
				return (
					analysisApi.endpoints.saveAnalysis.matchPending(action) ||
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
					analysisApi.endpoints.addAnalysis.matchFulfilled(action) ||
					analysisApi.endpoints.addAnalysisWithFile.matchFulfilled(
						action
					) ||
					analysisApi.endpoints.addAnalysisWithUrl.matchFulfilled(
						action
					)
				);
			}, succeeded);
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

export const { analysisRejected, resetAnalysis } = analysis.actions;

export default analysis.reducer;

export const selectAnalysisStatus = (state: RootState) => state.analysis;
