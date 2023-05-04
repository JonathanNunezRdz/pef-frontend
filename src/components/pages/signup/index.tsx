import { useSignUpMutation } from '@/store/auth';
import { SignUpFields } from '@/types';
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { parseErrorResponse } from '@/utils';

interface SignUpProps {}

export default function SignUp({}: SignUpProps) {
	// rtk hooks
	const [signUp, signUpResult] = useSignUpMutation();

	// react hooks
	const [showPassword, setShowPassword] = useState(false);

	// react-hook-form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignUpFields>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: classValidatorResolver(SignUpFields),
	});

	const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
		signUp(data);
	};
	const handleToggleShowPassword = () => setShowPassword((show) => !show);

	return (
		<Stack direction='column' spacing={4}>
			{/* start title */}
			<Box>
				<Box display='flex' alignItems='end' gap={4}>
					<Typography variant='h3'>Iniciar Sesión</Typography>
				</Box>
			</Box>
			{/* end tiitle */}

			{/* start sign in form */}
			<Box>
				<Paper sx={{ p: 4 }}>
					{/* CHANGE_PENDING -> add error and loading states */}
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Stack direction='column' spacing={4}>
							<TextField
								{...register('firstName')}
								label='Nombre'
								error={Boolean(errors.firstName)}
								helperText={
									errors.firstName && errors.firstName.message
								}
								FormHelperTextProps={{
									sx: {
										fontSize: 20,
									},
								}}
							/>

							<TextField
								{...register('lastName')}
								label='Apellido'
								error={Boolean(errors.lastName)}
								helperText={
									errors.lastName && errors.lastName.message
								}
								FormHelperTextProps={{
									sx: {
										fontSize: 20,
									},
								}}
							/>

							<TextField
								{...register('email')}
								label='Correo electrónico'
								type='email'
								error={Boolean(errors.email)}
								helperText={
									errors.email && errors.email.message
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<EmailIcon />
										</InputAdornment>
									),
								}}
								FormHelperTextProps={{
									sx: {
										fontSize: 20,
									},
								}}
							/>

							<TextField
								{...register('password')}
								label='Contraseña'
								type={showPassword ? 'text' : 'password'}
								error={Boolean(errors.password)}
								helperText={
									errors.password && errors.password.message
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PasswordIcon />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='activar o desactivar visibilidad de contraseña'
												onClick={
													handleToggleShowPassword
												}
												edge='end'
											>
												{showPassword ? (
													<VisibilityOffIcon />
												) : (
													<VisibilityIcon />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								FormHelperTextProps={{
									sx: {
										fontSize: 20,
									},
								}}
							/>

							<TextField
								{...register('confirmPassword')}
								label='Confirmar contraseña'
								type={showPassword ? 'text' : 'password'}
								error={Boolean(errors.confirmPassword)}
								helperText={
									errors.confirmPassword &&
									errors.confirmPassword.message
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PasswordIcon />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='activar o desactivar visibilidad de contraseña'
												onClick={
													handleToggleShowPassword
												}
												edge='end'
											>
												{showPassword ? (
													<VisibilityOffIcon />
												) : (
													<VisibilityIcon />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								FormHelperTextProps={{
									sx: {
										fontSize: 20,
									},
								}}
							/>

							{/* style error message correctly */}
							{signUpResult.isError && (
								<FormHelperText
									error={signUpResult.isError}
									sx={{
										fontSize: 20,
									}}
								>
									{
										parseErrorResponse(signUpResult.error)
											.message
									}
								</FormHelperText>
							)}

							<Button
								type='submit'
								variant='contained'
								color='secondary'
							>
								Crear cuenta
							</Button>
						</Stack>
					</form>
				</Paper>
			</Box>
			{/* end sign in form */}
		</Stack>
	);
}
