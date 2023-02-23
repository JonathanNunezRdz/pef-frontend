import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import analysisReducer from './analysis';
import { analysisApi } from './analysis/analysisApi';
import userReducer from './user';

export const store = configureStore({
	reducer: {
		user: userReducer,
		analysis: analysisReducer,
		[analysisApi.reducerPath]: analysisApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(analysisApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
