// TODO: type out the response that the frontend is going to receive

import { BaseAlgorithmScore, ResponseVariable } from '..';

export type AnalysisResponse = {
	id: string;
	createdAt: string;
	updatedAt: string;

	scores: BaseAlgorithmScore[];
	metrics: ResponseVariable[];
	originalText?: string;
};

export type SaveAnalysisResponse = AnalysisResponse & {
	description: string;
};

export type PostAnalysisResponse = AnalysisResponse;

export type GetAnalysisResponse = {
	data: {
		id: string;
		createdAt: string;

		description: string;

		scores: {
			id: string;
			value: number;
			dificulty: string | null;

			algorithm: {
				name: string;
				unit: string;
				max: number;
			};
		}[];
	}[];
	totalAnalysis: number;
};
