import { AnalysisErrorResponse, HttpError } from '@/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export function parseErrorResponse(
	error: FetchBaseQueryError | SerializedError
): AnalysisErrorResponse {
	if ('status' in error) {
		const { status } = error;
		if (status === 'FETCH_ERROR') {
			return {
				message:
					'Ha ocurrido un problema en la conexión, intenta más tarde',
				code: 500,
			};
		}
		const parsedError = error.data as HttpError;

		return {
			message:
				typeof parsedError.message === 'string'
					? parsedError.message
					: parsedError.message.reduce(
							(prev, message) => `${prev}${message}\n`,
							''
					  ),
			code: parsedError.statusCode,
		};
	}
	return {
		message: JSON.stringify(error),
		code: 500,
	};
}
