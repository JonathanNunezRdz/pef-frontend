import { AnalysisResponse } from './analysis.response';

export * from './analysis.response';
export * from './post-analysis.dto';

export type AnalysisResult = AnalysisResponse | undefined;

export type AnalysisErrorResponse = {
	message: string;
	code: number;
};
