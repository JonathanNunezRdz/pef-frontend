import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {
	Controller,
	SubmitHandler,
	useForm,
	FieldErrors,
	FieldValues,
} from 'react-hook-form';

interface RawTextTabPanelProps {}

interface FormInputs {
	text: string;
}

export default function RawTextTabPanel({}: RawTextTabPanelProps) {
	// hooks
	const { control, handleSubmit } = useForm<FormInputs>({
		defaultValues: {
			text: '',
		},
		resolver: (values) => {
			const errors: FieldErrors<FormInputs> = {};
			const validValues: FieldValues = values;
			if (values.text.trim() === '')
				errors.text = {
					type: 'required',
					message: 'Este campo es obligatorio',
				};
			else {
			}
			return {
				values: validValues,
				errors,
			};
		},
	});

	// functions
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
	};

	// effects

	// render
	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction='column' spacing='1rem'>
					<Paper sx={{ p: '1rem' }}>
						<Controller
							control={control}
							name='text'
							render={({ field, fieldState: { error } }) => (
								<TextField
									ref={field.ref}
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
									inputProps={{ 'aria-label': 'Texto' }}
									label='Introduce tu texto'
									error={Boolean(error)}
									helperText={error?.message}
									fullWidth
									multiline
									minRows={5}
									maxRows={10}
								/>
							)}
						/>
					</Paper>
					<Paper
						sx={{
							p: '1rem',
							flexDirection: 'row-reverse',
							display: 'flex',
						}}
					>
						<Button
							type='submit'
							variant='contained'
							color='secondary'
						>
							Analizar
						</Button>
					</Paper>
				</Stack>
			</form>
		</Box>
	);
}
