import { RequestStatus } from '../common';

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

export interface UserState {
	user: {
		data: User;
	} & RequestStatus;
	auth: {
		isLoggedIn: boolean;
		checkedJWT: boolean;
	};
	signIn: RequestStatus;
	signOut: RequestStatus;
}
