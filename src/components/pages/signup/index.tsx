import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useSignUpMutation } from '@/store/auth';
import { SignUpFields } from '@/types';
import { parseErrorResponse } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuth, setCredentials } from '@/store/auth/authReducer';

interface SignUpProps {}

export default function SignUp({}: SignUpProps) {
	// nextjs hooks
	const router = useRouter();

	// rtk hooks
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAppSelector(selectAuth);
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
		try {
			const res = await signUp(data).unwrap();
			dispatch(setCredentials(res));
		} catch (error) {}
	};
	const handleToggleShowPassword = () => setShowPassword((show) => !show);

	// effects
	useEffect(() => {
		if (isLoggedIn && router.isReady) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	return (
		<Stack direction='column' spacing={4}>
			{/* start title */}
			<Box>
				<Box display='flex' alignItems='end' gap={4}>
					<Typography variant='h3'>Crear Cuenta</Typography>
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
