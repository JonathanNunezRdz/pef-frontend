import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
	@IsEmail(undefined, {
		message: 'Por favor ingrese un correo electrónico válido',
	})
	@IsNotEmpty({ message: 'Por favor ingrese un correo electrónico' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Por favor ingrese una contraseña' })
	password: string;
}
