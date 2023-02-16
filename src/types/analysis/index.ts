import { RequestStatus } from '../common';
import { AllScores } from './scores';

export * from './scores';

export type Metrics = {
	numOfLetters: number;
	numOfSyllables: number;
	numOfWords: number;
	numOfSentences: number;
	avgLettersPerWord: number;
	avgSyllablePerWord: number;
	avgWordsPerSentence: number;
	avgSentencesPerHundredWords: number;
	avgSyllablesPerHundredWords: number;
	varLettersPerWord: number;
};

export type AnalysisResponse = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	scores: AllScores;
};

export type GetAnalysisResponse = {
	data: AnalysisResponse[];
};

export type PostAnalysisResponse = {
	data: AnalysisResponse;
};

export type PostAnalysisDto = {
	text: string;
};

export interface AnalysisState {
	get: {
		data: AnalysisResponse[];
	} & RequestStatus;
	post: {
		data: AnalysisResponse;
	} & RequestStatus;
}
