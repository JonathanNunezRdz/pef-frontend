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
import { TextField } from '@mui/material';

interface SaveRawTextFormProps {}

export default function SaveRawTextForm({}: SaveRawTextFormProps) {
	// rtk hooks
	const [saveAnalysis] = useSaveAnalysisMutation();

	// react hook form
	const { control, handleSubmit } = useForm<SaveAnalysisDto>({
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
			return {
				values: validValues,
				errors,
			};
		},
	});

	// functions
	const onSubmit: SubmitHandler<SaveAnalysisDto> = async (data) => {
		// TODO: change isUninitialized to true
		if (data.description === '') data.description = data.text.slice(0, 20);
		saveAnalysis(data);
	};

	// effects

	// render
	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction='column' spacing='1rem'>
					<Paper sx={{ p: '1rem' }}>
						<RawTextField control={control} from='save' />
					</Paper>
					<Paper sx={{ p: '1rem' }}>
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
										'aria-label': 'Titulo del análisis',
									}}
									label='Introduce un titulo para identificar este análisis'
									error={Boolean(error)}
									helperText={error?.message}
									fullWidth
								/>
							)}
						/>
					</Paper>
					<Card
						paperProps={{
							sx: {
								flexDirection: 'row-reverse',
								display: 'flex',
							},
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
