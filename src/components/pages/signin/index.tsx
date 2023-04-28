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
import { SubmitHandler, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Card from '@/components/common/Card';

interface SignInProps {}

export default function SignIn({}: SignInProps) {
	// rtk hooks
	const [signIn, signInResult] = useSignInMutation();

	// react hooks
	const [showPassword, setShowPassword] = useState(false);

	// react-hook-form
	const { handleSubmit, control, register } = useForm<SignInDto>({
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack direction='column' spacing={4}>
							<TextField
								{...register('email')}
								label='Correo electrónico'
								type='email'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<EmailIcon />
										</InputAdornment>
									),
								}}
							/>

							<TextField
								{...register('password')}
								label='Contraseña'
								type={showPassword ? 'text' : 'password'}
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
							/>

							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row-reverse',
								}}
							>
								<Button
									type='submit'
									variant='contained'
									color='secondary'
								>
									Entrar
								</Button>
							</Box>
						</Stack>
					</form>
				</Paper>
			</Box>
			{/* end sign in form */}
		</Stack>
	);
}
