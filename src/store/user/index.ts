export * from './selectors';

import { UserState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { signInAction } from './actions';

const initialState: UserState = {
	user: {
		data: {} as UserState['user']['data'],
		status: 'idle',
		error: undefined,
	},
	auth: {
		isLoggedIn: false,
		checkedJWT: false,
	},
	signIn: {
		status: 'idle',
		error: undefined,
	},
	signOut: {
		status: 'idle',
		error: undefined,
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(signInAction.pending, (state) => {
				state.signIn.status = 'loading';
			})
			.addCase(signInAction.fulfilled, (state, action) => {
				// setJWT in browser
				state.signIn.status = 'succeeded';
				state.signIn.error = undefined;
				state.auth.isLoggedIn = true;
			});
	},
});

const userReducer = userSlice.reducer;

// export const {  } = userSlice.actions;

export default userReducer;
