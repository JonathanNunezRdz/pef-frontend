import { IsOptional, IsString } from 'class-validator';
import { User } from '.';

export class PatchUserDto {
	@IsString()
	@IsOptional()
	firstName?: User['firstName'];

	@IsString()
	@IsOptional()
	lastName?: User['lastName'];
}

export interface PatchUserService {
	patchUserDto: PatchUserDto;
	userId: User['id'];
}
