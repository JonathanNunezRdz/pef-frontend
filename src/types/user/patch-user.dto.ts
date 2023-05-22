import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '.';

export class PatchUserDto {
	@IsString()
	@IsOptional()
	@IsNotEmpty({ message: 'Tu nombre no puede estar vacío' })
	firstName?: User['firstName'];

	@IsString()
	@IsOptional()
	@IsNotEmpty({ message: 'Tu apellido no puede estar vacío' })
	lastName?: User['lastName'];
}

export interface PatchUserService {
	patchUserDto: PatchUserDto;
	userId: User['id'];
}
