import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PostAnalysisDto {
	@IsString()
	text: string;

	@IsInt()
	@Min(1)
	@IsOptional()
	numOfSamples: number;
}

export interface PostAnalysisWithFileThunk {
	numOfSamples: number;
	document: File;
}

export interface PostAnalysisWithFileDto {
	numOfSamples: number;
	documentLoaded: boolean;
}
