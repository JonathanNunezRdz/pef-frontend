import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { analysisApi } from './analysis';
import { authApi } from './auth';
import { userApi } from './user';

export const store = configureStore({
	reducer: {
		[analysisApi.reducerPath]: analysisApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			analysisApi.middleware,
			userApi.middleware,
			authApi.middleware
		),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
