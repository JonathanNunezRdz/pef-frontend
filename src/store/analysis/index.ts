import { AnalysisResponse, AnalysisState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { postAnalysisAction } from './actions';

const initialState: AnalysisState = {
	get: {
		data: [],
		status: 'idle',
		error: undefined,
	},
	post: {
		data: {} as AnalysisResponse,
		status: 'idle',
		error: undefined,
	},
};

export const analysisSlice = createSlice({
	name: 'anaylisis',
	initialState,
	reducers: {
		resetPostAnalysisAction: (state) => {
			state.post.data = {} as AnalysisResponse;
			state.post.status = 'idle';
			state.post.error = undefined;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(postAnalysisAction.pending, (state) => {
				state.post.status = 'loading';
				state.post.error = undefined;
			})
			.addCase(postAnalysisAction.fulfilled, (state, action) => {
				state.post.status = 'succeeded';
				state.post.data = action.payload.data;
			})
			.addCase(postAnalysisAction.rejected, (state, action) => {
				state.post.status = 'failed';
				state.post.data = {} as AnalysisResponse;
				state.post.error = action.payload;
			});
	},
});

const analysisReducer = analysisSlice.reducer;

export const { resetPostAnalysisAction } = analysisSlice.actions;

export default analysisReducer;
