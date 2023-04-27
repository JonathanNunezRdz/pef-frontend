export * from './patch-user.dto';
export * from './post-user.dto';
export * from './signin.dto';
export * from './signup.dto';
export * from './user.response';

import { RequestStatus } from '../common';
import { UserResponse } from './user.response';

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	hash: string;
};

export interface UserState {
	user: {
		data: UserResponse;
	} & RequestStatus;
	auth: {
		isLoggedIn: boolean;
		checkedJWT: boolean;
	};
	signIn: RequestStatus;
	signOut: RequestStatus;
}
