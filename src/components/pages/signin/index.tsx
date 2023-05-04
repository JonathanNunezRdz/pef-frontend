import { useSignInMutation } from '@/store/auth';
import { SignInDto } from '@/types';
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
import { useEffect, useState } from 'react';
import { parseErrorResponse } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuth, setCredentials } from '@/store/auth/authReducer';
import { useRouter } from 'next/router';

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
		const res = await signIn(data).unwrap();
		dispatch(setCredentials(res));
	};
	const handleToggleShowPassword = () => setShowPassword((show) => !show);

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

							{/* style error message correctly */}
							{signInResult.isError && (
								// <Box>
								// 	<Typography textTransform='capitalize'>
								// 		{
								// 			parseErrorResponse(
								// 				signInResult.error
								// 			).message
								// 		}
								// 	</Typography>
								// </Box>
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
							>
								Entrar
							</Button>
						</Stack>
					</form>
				</Paper>
			</Box>
			{/* end sign in form */}
		</Stack>
	);
}
