import { HttpError, SignInDto, SignInResponse } from '@/types';
import { getAxiosError } from '@/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services';

export const signInAction = createAsyncThunk<
	SignInResponse,
	SignInDto,
	{ rejectValue: HttpError }
>('user/signIn', async (dto, { rejectWithValue }) => {
	try {
		const { data } = await userService.signIn(dto);
		return data;
	} catch (error) {
		const errorData = getAxiosError(error);
		return rejectWithValue(errorData);
	}
});
