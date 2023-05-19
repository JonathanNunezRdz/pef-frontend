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

interface SaveUrlFormProps {}

export default function SaveUrlForm({}: SaveUrlFormProps) {
	// rtk hooks
	const [saveAnalysis] = useSaveAnalysisWithUrlMutation();

	// react hook form
	const { control, handleSubmit } = useForm<SaveAnalysisWithUrlDto>({
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
