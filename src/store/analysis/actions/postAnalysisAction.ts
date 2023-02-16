import { HttpError, PostAnalysisDto, PostAnalysisResponse } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postAnalysisAction = createAsyncThunk<
	PostAnalysisResponse,
	PostAnalysisDto,
	{ rejectValue: HttpError }
>('analysis/post', async (dto, { rejectWithValue }) => {
	try {
		const res = await fetch('http://localhost:4200/analysis', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dto),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		return rejectWithValue(error as HttpError);
	}
});
