import { JWTPayload, JWTStatus } from '@/types';

export function getJWTFromLocalStorage() {
	if (typeof process.env.NEXT_PUBLIC_JWT_LOCAL_STORAGE_KEY === 'undefined') {
		throw new Error('env not set');
	}
	return localStorage.getItem(process.env.NEXT_PUBLIC_JWT_LOCAL_STORAGE_KEY);
}

export function invalidateJWT() {
	if (typeof process.env.NEXT_PUBLIC_JWT_LOCAL_STORAGE_KEY === 'undefined') {
		throw new Error('env not set');
	}
	localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_LOCAL_STORAGE_KEY);
}

export function validateJWT(): JWTStatus {
	const jwt = getJWTFromLocalStorage();

	if (jwt !== null) {
		const payloadString = Buffer.from(
			jwt.split('.')[1],
			'base64'
		).toString();
		const { exp } = JSON.parse(payloadString) as JWTPayload;

		if (exp * 1000 > Date.now())
			return {
				jwt,
				valid: true,
			};

		invalidateJWT();
		return { valid: false };
	}
	invalidateJWT();
	return { valid: false };
}

export function setJWT(jwt: string) {
	if (typeof process.env.NEXT_PUBLIC_JWT_LOCAL_STORAGE_KEY === 'undefined') {
		throw new Error('env not set');
	}
	localStorage.setItem(process.env.NEXT_PUBLIC_JWT_LOCAL_STORAGE_KEY, jwt);
}
