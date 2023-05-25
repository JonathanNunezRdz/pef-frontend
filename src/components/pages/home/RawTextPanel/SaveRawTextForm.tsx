import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
	SubmitHandler,
	useForm,
	FieldErrors,
	FieldValues,
	Controller,
} from 'react-hook-form';
import Card from '@/components/common/Card';
import { useSaveAnalysisMutation } from '@/store/analysis';
import { SaveAnalysisDto } from '@/types';
import RawTextField from '@/components/common/RawTextField';
import { TextField, Typography } from '@mui/material';

interface SaveRawTextFormProps {}

export default function SaveRawTextForm({}: SaveRawTextFormProps) {
	// rtk hooks
	const [saveAnalysis] = useSaveAnalysisMutation();

	// react hook form
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SaveAnalysisDto>({
		defaultValues: {
			text: '',
			numOfSamples: 10,
			description: '',
		},
		resolver: (values) => {
			const errors: FieldErrors<SaveAnalysisDto> = {};
			const validValues: FieldValues = values;
			if (values.text.trim() === '')
				errors.text = {
					type: 'required',
					message: 'Este campo es obligatorio',
				};
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
	const onSubmit: SubmitHandler<SaveAnalysisDto> = (data) => {
		saveAnalysis(data);
	};

	// effects

	// render
	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<Paper sx={{ p: 2 }}>
						<RawTextField control={control} from='save' />
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
