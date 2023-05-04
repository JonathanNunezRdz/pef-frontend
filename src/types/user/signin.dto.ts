import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
	@IsEmail(undefined, {
		message: 'por favor ingrese un correo electrónico válido',
	})
	@IsNotEmpty({ message: 'por favor ingrese un correo electrónico' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'por favor ingrese una contraseña' })
	password: string;
}
