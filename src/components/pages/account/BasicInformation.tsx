import Card from '@/components/common/Card';
import Notification from '@/components/common/Notification';
import { useAppSelector } from '@/hooks';
import { selectAuth } from '@/store/auth/authReducer';
import { useEditUserMutation, useGetMeQuery } from '@/store/user';
import { PatchUserDto } from '@/types';
import { parseErrorResponse } from '@/utils';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Alert, Box, Button, Snackbar, Stack, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface BasicInformationProps {}

export default function BasicInformation({}: BasicInformationProps) {
	// rtk hooks
	const { isLoggedIn } = useAppSelector(selectAuth);
	const [editUser, editUserResult] = useEditUserMutation();
	const { data } = useGetMeQuery(undefined, {
		skip: !isLoggedIn,
	});

	// react hooks
	const [showError, setShowError] = useState(false);
	const [errorClosed, setErrorClosed] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [successClosed, setSuccessClosed] = useState(false);

	// use form
	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
		getValues,
		reset,
	} = useForm<PatchUserDto>({
		defaultValues: {
			firstName: '',
			lastName: '',
		},
		resolver: classValidatorResolver(PatchUserDto),
	});

	// functions
	const onSubmit: SubmitHandler<PatchUserDto> = async (data) => {
		try {
			await editUser(data);
			reset();
		} catch (error) {}
	};
	const getIsDirty = useCallback(() => {
		if (data) {
			if (getValues('firstName') !== data.firstName) return true;
			if (getValues('lastName') !== data.lastName) return true;
			return false;
		}
		return false;
	}, [getValues, data]);
	const handleCloseError = () => {
		setShowError(false);
		setErrorClosed(true);
	};
	const handleCloseSuccess = () => {
		setShowSuccess(false);
		setSuccessClosed(true);
	};

	// effects
	useEffect(() => {
		if (editUserResult.isError && !showError && !errorClosed) {
			setShowError(true);
		} else if (!editUserResult.isError) {
			setShowError(false);
			setErrorClosed(false);
		}
	}, [editUserResult.isError, errorClosed, showError]);

	useEffect(() => {
		if (editUserResult.isSuccess && !showSuccess && !successClosed) {
			setShowSuccess(true);
		} else if (!editUserResult.isSuccess) {
			setShowSuccess(false);
			setSuccessClosed(false);
		}
	}, [editUserResult.isSuccess, showSuccess, successClosed]);

	// render
	return (
		<Box>
			<Card sx={{ p: 4 }}>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Stack spacing={4}>
						<TextField
							{...register('firstName')}
							label='Nombre'
							error={Boolean(errors.firstName)}
							placeholder='Escribe tu nombre'
							helperText={
								errors.firstName
									? errors.firstName.message
									: data &&
									  `Tu nombre actual es: ${data.firstName}`
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
							placeholder='Escribe tu apellido'
							helperText={
								errors.lastName
									? errors.lastName.message
									: data &&
									  `Tu apellido actual es: ${data.lastName}`
							}
							error={Boolean(errors.lastName)}
							FormHelperTextProps={{
								sx: {
									fontSize: 20,
								},
							}}
						/>

						<Notification
							open={showError}
							onClose={handleCloseError}
							type='error'
							message={
								editUserResult.isError
									? parseErrorResponse(editUserResult.error)
											.message
									: ''
							}
						/>

						<Notification
							open={showSuccess}
							onClose={handleCloseSuccess}
							type='success'
							autoHideDuration={6000}
							message='Tus datos han sido actualizados exitosamente'
						/>

						<Button
							type='submit'
							variant='contained'
							color='secondary'
							disabled={!getIsDirty() && isValid}
						>
							Aplicar cambios
						</Button>
					</Stack>
				</form>
			</Card>
		</Box>
	);
}
