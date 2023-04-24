import { AnalysisErrorResponse } from '@/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export function parseErrorResponse(
	error: FetchBaseQueryError | SerializedError
): AnalysisErrorResponse {
	if ('status' in error) {
		return {
			message: JSON.stringify(error.data),
			code: 500,
		};
	}
	return {
		message: JSON.stringify(error),
		code: 500,
	};
}
