import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import {
	Controller,
	SubmitHandler,
	useForm,
	FieldErrors,
	FieldValues,
} from 'react-hook-form';
import { validateUrl } from '@/utils';

interface UrlTabPanelProps {}

interface FormInputs {
	url: string;
}

export default function UrlTabPanel({}: UrlTabPanelProps) {
	// hooks
	const { control, handleSubmit } = useForm<FormInputs>({
		defaultValues: {
			url: '',
		},
		resolver: (values) => {
			const errors: FieldErrors<FormInputs> = {};
			const validValues: FieldValues = values;
			const url = values.url.trim();
			if (url === '') {
				errors.url = {
					type: 'required',
					message: 'Este campo es obligatorio',
				};
			} else if (!validateUrl(url)) {
				errors.url = {
					type: 'pattern',
					message: 'Este enlace no es válido',
				};
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
							name='url'
							render={({ field, fieldState: { error } }) => (
								<TextField
									ref={field.ref}
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
									inputProps={{ 'aria-label': 'Url' }}
									label='Introduce un enlace'
									error={Boolean(error)}
									helperText={error?.message}
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<LinkIcon />
											</InputAdornment>
										),
									}}
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
