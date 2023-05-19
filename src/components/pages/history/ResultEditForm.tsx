import { usePatchResultMutation } from '@/store/result';
import { PatchResultDto } from '@/types/result';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface ResultEditFormProps {
	resultId: string;
	originalDescription: string;
	onSuccess?: () => void;
}

export default function ResultEditForm({
	resultId,
	originalDescription,
	onSuccess,
}: ResultEditFormProps) {
	// rtk hooks
	const [patchResult] = usePatchResultMutation();

	// react hook form
	const { control, handleSubmit } = useForm<PatchResultDto>({
		defaultValues: {
			description: originalDescription,
		},
		resolver: classValidatorResolver(PatchResultDto),
	});

	// functions
	const onSubmit: SubmitHandler<PatchResultDto> = async (data) => {
		await patchResult({ description: data.description, resultId });
		if (onSuccess) onSuccess();
	};

	return (
		<Box width='100%'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box display='flex' gap={1}>
					<Controller
						control={control}
						name='description'
						render={({ field, fieldState: { error } }) => (
							<TextField
								ref={field.ref}
								value={field.value}
								onChange={field.onChange}
								onBlur={field.onBlur}
								inputProps={{
									'aria-label': 'Título del análisis',
								}}
								InputProps={{
									sx: {
										height: '50px',
									},
								}}
								label='Introduce un título para identificar este análisis'
								error={Boolean(error)}
								helperText={error?.message}
								fullWidth
								sx={{
									height: '50px',
								}}
							/>
						)}
					/>
					<Button
						type='submit'
						variant='contained'
						color='secondary'
						sx={{
							height: '50px',
						}}
					>
						Guardar
					</Button>
				</Box>
			</form>
		</Box>
	);
}
