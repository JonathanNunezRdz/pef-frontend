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

export type CrawfordScore = {
	years: number;
};

export type Score = {
	score: number;
};

export type AllScores = {
	fHuerta: FernandezHuertaScore;
	gPolini: GutierrezPoliniScore;
	sPazos: SzigrisztPazosScore;
	crawford: CrawfordScore;
	inflesz: InfleszScore;
	mu: muScore;
};

/**
 * TODO: cambiar scores a que sean normalizados
 *
 * type BaseScore = {
 * 	value: number;
 * 	valueType: 'puntaje' | 'escolaridad';
 * 	author: string;
 * }
 *
 * */