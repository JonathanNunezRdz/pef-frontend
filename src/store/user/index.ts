export * from './selectors';

import { User, UserState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
	user: {
		data: {} as User,
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
	reducers: {
		testLoginAction: (state) => {
			state.auth.isLoggedIn = true;
			state.user.data = {
				email: 'jonathan.nunez@udem.edu',
				firstName: 'Jonathan',
				lastName: 'Nunez',
				id: '6fae0713-16e9-480a-8e8a-8e2c6c28cdeb',
			};
		},
		testLogoutAction: (state) => {
			state.auth.isLoggedIn = false;
			state.user.data = {} as User;
		},
	},
});

const userReducer = userSlice.reducer;

export const { testLoginAction, testLogoutAction } = userSlice.actions;

export default userReducer;
