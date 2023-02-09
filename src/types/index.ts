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

export type FernandezHuertaScore = Score & {
	difficulty: string;
	schoolGrade: string;
};

export type GutierrezPoliniScore = Score & {
	difficulty: string;
};

export type SzigrisztPazosScore = Score & {
	difficulty: string;
	type: string;
	schoolGrade: string;
};

export type InfleszScore = Score & {
	difficulty: string;
};

export type muScore = Score & {
	difficulty: string;
};

export type Score = {
	score: number;
};

export type AllScores = {
	fh: FernandezHuertaScore;
	gp: GutierrezPoliniScore;
	sp: SzigrisztPazosScore;
	c: Score;
	i: InfleszScore;
	m: muScore;
};
