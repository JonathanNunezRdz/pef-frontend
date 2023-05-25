import Card from '@/components/common/Card';
import { useSaveAnalysisWithUrlMutation } from '@/store/analysis';
import { SaveAnalysisWithUrlDto } from '@/types';
import { validateUrl } from '@/utils';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import {
	Controller,
	FieldErrors,
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import { Typography } from '@mui/material';

interface SaveUrlFormProps {}

export default function SaveUrlForm({}: SaveUrlFormProps) {
	// rtk hooks
	const [saveAnalysis] = useSaveAnalysisWithUrlMutation();

	// react hook form
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SaveAnalysisWithUrlDto>({
		defaultValues: {
			url: '',
			numOfSamples: 5,
			description: '',
		},
		resolver: (values) => {
			const errors: FieldErrors<SaveAnalysisWithUrlDto> = {};
			const validValues: FieldValues = { ...values };
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
			if (values.numOfSamples > 20) {
				errors.numOfSamples = {
					type: 'invalid',
					message: 'El número máximo de muestras es 20',
				};
			}
			if (values.numOfSamples < 1) {
				errors.numOfSamples = {
					type: 'invalid',
					message: 'El número mínimo de muestras es 1',
				};
			}
			return {
				values: validValues,
				errors,
			};
		},
	});

	// functions
	const onSubmit: SubmitHandler<SaveAnalysisWithUrlDto> = (data) => {
		saveAnalysis(data);
	};

	// render
	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<Paper sx={{ p: 2 }}>
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
					<Paper sx={{ p: 2 }}>
						<TextField
							{...register('numOfSamples')}
							type='number'
							label='Número de muestras'
							error={Boolean(errors.numOfSamples)}
							helperText={
								errors.numOfSamples &&
								errors.numOfSamples.message
							}
							inputProps={{
								inputMode: 'numeric',
								min: 1,
								max: 20,
							}}
							fullWidth
						/>
						<Typography mt={1}>
							Este número se utiliza para el Algoritmo de
							Fernández Huerta, recomendamos que suba en
							proporción al tamaño del texto.
						</Typography>
					</Paper>

					<Paper sx={{ p: 2 }}>
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
									label='Introduce un título para identificar este análisis'
									error={Boolean(error)}
									helperText={error?.message}
									fullWidth
								/>
							)}
						/>
					</Paper>
					<Card
						sx={{
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
					</Card>
				</Stack>
			</form>
		</Box>
	);
}
