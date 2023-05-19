import { BaseScore, ScoreExtra } from '..';

export type BaseAlgorithmScore = {
	id: string;

	name: string;
	unit: string;
	min: number;
	max: number;

	score: BaseScore;
};

export type AlgorithmWithScale = {
	id: string;
	name: string;
	scales?: {
		id: string;
		level: string;
		upperLimit: number;
		extra: ScoreExtra | null;
	}[];
};
