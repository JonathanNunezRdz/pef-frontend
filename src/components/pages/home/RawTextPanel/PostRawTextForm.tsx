import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
	SubmitHandler,
	useForm,
	FieldErrors,
	FieldValues,
} from 'react-hook-form';
import Card from '@/components/common/Card';
import { useAddAnalysisMutation } from '@/store/analysis';
import { PostAnalysisDto } from '@/types';
import RawTextField from '@/components/common/RawTextField';
import { TextField, Typography } from '@mui/material';

interface PostRawTextFormProps {}

export default function PostRawTextForm({}: PostRawTextFormProps) {
	// rtk hooks
	const [postAnalysis] = useAddAnalysisMutation();

	// react hook form
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<PostAnalysisDto>({
		defaultValues: {
			text: '',
			numOfSamples: 5,
		},
		resolver: (values) => {
			const errors: FieldErrors<PostAnalysisDto> = {};
			const validValues: FieldValues = values;
			const text = values.text.trim();
			if (text === '')
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
	const onSubmit: SubmitHandler<PostAnalysisDto> = (data) => {
		postAnalysis(data);
	};

	// effects

	// render
	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<Paper sx={{ p: 2 }}>
						<RawTextField control={control} from='post' />
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
						<Typography mt={1} fontSize={16}>
							Este número se utiliza para el Algoritmo de
							Fernández Huerta, recomendamos que se incremente en
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
