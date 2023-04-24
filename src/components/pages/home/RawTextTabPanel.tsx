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
import Card from '@/components/common/Card';
import { useAddAnalysisMutation } from '@/store/analysis/analysisApi';
import { PostAnalysisDto } from '@/types';

interface RawTextTabPanelProps {}

export default function RawTextTabPanel({}: RawTextTabPanelProps) {
	// rtk hooks
	const [postAnalysis] = useAddAnalysisMutation({ fixedCacheKey: 'raw' });

	// react hook form
	const { control, handleSubmit } = useForm<PostAnalysisDto>({
		defaultValues: {
			text: '',
			numOfSamples: 10,
		},
		resolver: (values) => {
			const errors: FieldErrors<PostAnalysisDto> = {};
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
	const onSubmit: SubmitHandler<PostAnalysisDto> = async (data) => {
		// call backend to analyze text
		// dispatch(postAnalysisAction(data));
		postAnalysis(data);
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
