import { IsEmail, IsString } from 'class-validator';
import { User } from '.';

export class PostUserDto {
	@IsEmail()
	email: string;

	@IsString()
	firstName: User['firstName'];

	@IsString()
	lastName: User['lastName'];

	@IsString()
	password: string;
}
