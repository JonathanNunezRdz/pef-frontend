import { Match } from '@/utils';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
	@IsString()
	@IsNotEmpty({ message: 'Por favor ingrese su contraseña actual' })
	oldPassword: string;

	@IsString()
	@IsNotEmpty({ message: 'Por favor ingrese una contraseña' })
	newPassword: string;
}

export class ChangePasswordFields extends ChangePasswordDto {
	@Match(ChangePasswordDto, (f) => f.newPassword, {
		message: 'Ambas contraseñas tienen que ser igual',
	})
	@IsString()
	@IsNotEmpty({ message: 'Por favor ingrese una contraseña' })
	confirmPassword: string;
}
