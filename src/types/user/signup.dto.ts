import { Match } from '@/utils';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
	@IsString()
	@IsNotEmpty({
		message: 'Por favor ingrese su nombre',
	})
	firstName: string;

	@IsString()
	@IsNotEmpty({
		message: 'Por favor ingrese su apellido',
	})
	lastName: string;

	@IsEmail(undefined, {
		message: 'Por favor ingrese un correo electrónico válido',
	})
	@IsNotEmpty({ message: 'Por favor ingrese un correo electrónico' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Por favor ingrese una contraseña' })
	password: string;
}

export class SignUpFields extends SignUpDto {
	@Match(SignUpFields, (f) => f.password, {
		message: 'Ambas contraseñas tienen que ser igual',
	})
	@IsString()
	@IsNotEmpty({ message: 'Por favor ingrese una contraseña' })
	confirmPassword: string;
}
