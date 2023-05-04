import { AnalysisErrorResponse, HttpError } from '@/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export function parseErrorResponse(
	error: FetchBaseQueryError | SerializedError
): AnalysisErrorResponse {
	if ('status' in error) {
		const parsedError = error.data as HttpError;

		return {
			message:
				typeof parsedError.message === 'string'
					? parsedError.message
					: parsedError.message.reduce(
							(prev, message) => `${prev} ${message}`,
							''
					  ),
			code: 500,
		};
	}
	return {
		message: JSON.stringify(error),
		code: 500,
	};
}
