import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PostAnalysisDto {
	@IsString()
	text: string;

	@IsInt()
	@Min(1)
	@Max(20)
	@IsOptional()
	numOfSamples: number;
}

export class SaveAnalysisDto extends PostAnalysisDto {
	@IsString()
	@IsOptional()
	description?: string;
}

export interface PostAnalysisWithFileThunk {
	numOfSamples: number;
	document: File;
}

export interface SaveAnalysisWithFileThunk extends PostAnalysisWithFileThunk {
	description?: string;
}

export interface PostAnalysisWithFileDto {
	numOfSamples: number;
	documentLoaded: boolean;
}

export interface SaveAnalysisWithFileDto extends PostAnalysisWithFileDto {
	description?: string;
}

export class PostAnalysisWithUrlDto {
	@IsString()
	url: string;

	@IsInt()
	@Min(1)
	@Max(20)
	@IsOptional()
	numOfSamples: number;
}

export class SaveAnalysisWithUrlDto extends PostAnalysisWithUrlDto {
	@IsString()
	@IsOptional()
	description?: string;
}
