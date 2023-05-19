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
import { useAddAnalysisWithUrlMutation } from '@/store/analysis';
import { PostAnalysisWithUrlDto } from '@/types';
import Card from '@/components/common/Card';

interface PostUrlFormProps {}

export default function PostUrlForm({}: PostUrlFormProps) {
	// rtk hooks
	const [postAnalysisWithUrl] = useAddAnalysisWithUrlMutation();

	// react-hook-form
	const { control, handleSubmit } = useForm<PostAnalysisWithUrlDto>({
		defaultValues: {
			url: '',
			numOfSamples: 5,
		},
		resolver: (values) => {
			const errors: FieldErrors<PostAnalysisWithUrlDto> = {};
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
	const onSubmit: SubmitHandler<PostAnalysisWithUrlDto> = (data) => {
		postAnalysisWithUrl(data);
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
