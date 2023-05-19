import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import analysisReducer from './analysis/analysisReducer';
import { baseApi } from './api';
import authReducer from './auth/authReducer';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		analysis: analysisReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
