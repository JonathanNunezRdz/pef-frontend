import api from '@/store/api';
import { GetUserResponse, SignInDto, SignInResponse } from '@/types';

function getUser() {
	return api.get<GetUserResponse>('/user/me');
}

function signIn(dto: SignInDto) {
	return api.post<SignInResponse>('/auth/signin', dto);
}

function signOut() {
	return api.post<void>('/auth/signout');
}

const userService = {
	signIn,
	getUser,
	signOut,
};

export default userService;
