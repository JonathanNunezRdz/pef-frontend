import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useSignInMutation } from '@/store/auth';
import { SignInDto } from '@/types';
import { parseErrorResponse } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuth, setCredentials } from '@/store/auth/authReducer';

interface SignInProps {}

export default function SignIn({}: SignInProps) {
	// nextjs hooks
	const router = useRouter();

	// rtk hooks
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAppSelector(selectAuth);
	const [signIn, signInResult] = useSignInMutation();

	// react hooks
	const [showPassword, setShowPassword] = useState(false);

	// react-hook-form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignInDto>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: classValidatorResolver(SignInDto),
	});

	const onSubmit: SubmitHandler<SignInDto> = async (data) => {
		signIn(data);
	};
	const handleToggleShowPassword = () => setShowPassword((show) => !show);

	useEffect(() => {
		if (isLoggedIn && router.isReady) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	useEffect(() => {
		if (signInResult.isSuccess) {
			dispatch(setCredentials(signInResult.data));
		}
	}, [dispatch, signInResult.isSuccess, signInResult.data]);

	return (
		<Stack direction='column' spacing={4}>
			{/* start title */}
			<Box>
				<Box display='flex' alignItems='end' gap={4}>
					<Typography variant='h3'>Iniciar Sesión</Typography>
				</Box>
			</Box>
			{/* end title */}

			{/* start sign in form */}
			<Box>
				<Paper sx={{ p: 4 }}>
					{/* CHANGE_PENDING -> add error and loading states */}
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Stack direction='column' spacing={4}>
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

							{signInResult.isLoading && (
								<Box display='flex' justifyContent='center'>
									<CircularProgress />
								</Box>
							)}

							{/* style error message correctly */}
							{signInResult.isError && (
								<FormHelperText
									error={signInResult.isError}
									sx={{
										fontSize: 20,
										textTransform: 'capitalize',
									}}
								>
									{
										parseErrorResponse(signInResult.error)
											.message
									}
								</FormHelperText>
							)}

							<Button
								type='submit'
								variant='contained'
								color='secondary'
								disabled={signInResult.isLoading}
							>
								{signInResult.isLoading
									? 'Cargando...'
									: 'Entrar'}
							</Button>
						</Stack>
					</form>
				</Paper>
			</Box>
			{/* end sign in form */}
		</Stack>
	);
}
