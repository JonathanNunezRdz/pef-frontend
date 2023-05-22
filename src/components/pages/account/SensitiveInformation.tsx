import Card from '@/components/common/Card';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useChangePasswordMutation } from '@/store/user';
import { ChangePasswordFields } from '@/types/user/change-password.dto';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
	Alert,
	Box,
	Button,
	IconButton,
	InputAdornment,
	Snackbar,
	Stack,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { parseErrorResponse } from '@/utils';
import Notification from '@/components/common/Notification';

interface SensitiveInformationProps {}

export default function SensitiveInformation({}: SensitiveInformationProps) {
	// rtk hooks
	const [changePassword, changePasswordResult] = useChangePasswordMutation();

	// react hooks
	const [showPassword, setShowPassword] = useState(false);
	const [showError, setShowError] = useState(false);
	const [errorClosed, setErrorClosed] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [successClosed, setSuccessClosed] = useState(false);

	// use form hook
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ChangePasswordFields>({
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		resolver: classValidatorResolver(ChangePasswordFields),
	});

	// functions
	const onSubmit: SubmitHandler<ChangePasswordFields> = (data) => {
		changePassword({
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		});
	};
	const handleToggleShowPassword = () => setShowPassword((show) => !show);
	const handleCloseError = () => {
		setShowError(false);
		setErrorClosed(true);
	};
	const handleCloseSuccess = () => {
		setShowSuccess(false);
		setSuccessClosed(true);
	};

	useEffect(() => {
		if (changePasswordResult.isError && !showError && !errorClosed) {
			setShowError(true);
		} else if (!changePasswordResult.isError) {
			setShowError(false);
			setErrorClosed(false);
		}
	}, [changePasswordResult.isError, errorClosed, showError]);

	useEffect(() => {
		if (changePasswordResult.isSuccess && !showSuccess && !successClosed) {
			setShowSuccess(true);
		} else if (!changePasswordResult.isSuccess) {
			setShowSuccess(false);
			setSuccessClosed(false);
		}
	}, [changePasswordResult.isSuccess, showSuccess, successClosed]);

	// render
	return (
		<Box>
			<Card sx={{ p: 4 }}>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Stack spacing={4}>
						<TextField
							{...register('oldPassword')}
							label='Contraseña actual'
							type={showPassword ? 'text' : 'password'}
							error={Boolean(errors.oldPassword)}
							helperText={
								errors.oldPassword && errors.oldPassword.message
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
											onClick={handleToggleShowPassword}
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
							{...register('newPassword')}
							label='Nueva contraseña'
							type={showPassword ? 'text' : 'password'}
							error={Boolean(errors.newPassword)}
							helperText={
								errors.newPassword && errors.newPassword.message
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
											onClick={handleToggleShowPassword}
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
											onClick={handleToggleShowPassword}
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

						<Notification
							open={showError}
							onClose={handleCloseError}
							type='error'
							message={
								changePasswordResult.isError
									? parseErrorResponse(
											changePasswordResult.error
									  ).message
									: ''
							}
						/>

						<Notification
							open={showSuccess}
							onClose={handleCloseSuccess}
							type='success'
							autoHideDuration={6000}
							message='Tu contraseña ha sido actualizada exitosamente'
						/>

						<Button
							type='submit'
							variant='contained'
							color='secondary'
						>
							Cambiar contraseña
						</Button>
					</Stack>
				</form>
			</Card>
		</Box>
	);
}
