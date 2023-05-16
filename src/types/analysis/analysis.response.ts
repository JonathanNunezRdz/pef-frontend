// TODO: type out the response that the frontend is going to receive

import { BaseAlgorithmScore, Metrics } from '..';

export type AnalysisResponse = {
	id: string;
	createdAt: Date;
	updatedAt: Date;

	scores: BaseAlgorithmScore[];
	metrics: Metrics;
	originalText: string;
};

export type PostAnalysisResponse = AnalysisResponse;

export type SaveAnalysisResponse = AnalysisResponse & {
	description: string;
};

export type GetAnalysisResponse = {
	data: {
		id: string;
		createdAt: Date;

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
