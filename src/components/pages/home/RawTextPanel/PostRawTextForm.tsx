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

interface PostRawTextFormProps {}

export default function PostRawTextForm({}: PostRawTextFormProps) {
	// rtk hooks
	const [postAnalysis] = useAddAnalysisMutation();

	// react hook form
	const { control, handleSubmit } = useForm<PostAnalysisDto>({
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
				<Stack direction='column' spacing='1rem'>
					<Paper sx={{ p: '1rem' }}>
						<RawTextField control={control} from='post' />
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
