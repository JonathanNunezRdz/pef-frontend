import { IsString } from 'class-validator';

export class PatchResultDto {
	@IsString()
	description: string;
}

export interface PatchResultThunk extends PatchResultDto {
	resultId: string;
}
