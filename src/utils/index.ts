import { HttpError } from '@/types';
import { AxiosError } from 'axios';

export * from './createEmotionCache';
export * from './jwtUtils';
export * from './loadDocument';
export * from './match.decorator';
export * from './parseErrorResponse';
export * from './validateUrl';

export const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200';

export function getAxiosError(error: unknown) {
	if (error instanceof AxiosError) {
		const { response } = error as AxiosError<HttpError>;
		if (typeof response === 'undefined') throw error;
		return response.data;
	}
	throw error;
}
