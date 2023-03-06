export type HttpStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface HttpError {
	error: string;
	message: string | string[];
	statusCode: number;
}

export interface RequestStatus {
	status: HttpStatus;
	error: HttpError | undefined;
}

export interface JWTPayload {
	email: string;
	exp: number;
	iat: number;
	sub: string;
}

export interface ValidJWT {
	jwt: string;
	valid: true;
}

export interface InvalidJWT {
	valid: false;
}

export type JWTStatus = ValidJWT | InvalidJWT;

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
