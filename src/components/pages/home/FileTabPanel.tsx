import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ChangeEvent, useState } from 'react';
import { FormHelperText, Typography } from '@mui/material';
import {
	FieldErrors,
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import { PostAnalysisWithFileDto } from '@/types';
import { useAddAnalysisWithFileMutation } from '@/store/analysis/analysisApi';

interface FileTabPanelProps {}

export default function FileTabPanel({}: FileTabPanelProps) {
	// rtk hooks
	const [postAnalysisWithFile] = useAddAnalysisWithFileMutation({
		fixedCacheKey: 'file',
	});
	// react hooks
	const [document, setDocument] = useState<File>();

	// react hook form
	const { handleSubmit, setValue, watch } = useForm<PostAnalysisWithFileDto>({
		defaultValues: {
			numOfSamples: 10,
			documentLoaded: false,
		},
		resolver: (values) => {
			const errors: FieldErrors<PostAnalysisWithFileDto> = {};
			const validValues: FieldValues = { ...values };
			if (!values.documentLoaded) {
				errors.documentLoaded = {
					type: 'required',
					message: 'Este campo es obligatorio',
				};
			}
			return {
				values: validValues,
				errors,
			};
		},
	});

	// functions
	const onSubmit: SubmitHandler<PostAnalysisWithFileDto> = (data) => {
		if (!document) return;
		postAnalysisWithFile({ document, numOfSamples: data.numOfSamples });
	};
	const handleDocumentChange = async (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const { files } = event.currentTarget;
		if (!files || !files[0]) return;
		const format = files[0].type;
		if (!/(application\/pdf|text\/plain)/.test(format)) return;
		setDocument(files[0]);
		setValue('documentLoaded', true);
	};

	// effects

	// render
	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction='column' spacing='1rem'>
					<Paper sx={{ p: '1rem' }}>
						<Button
							variant='contained'
							color='secondary'
							component='label'
							startIcon={<UploadFileIcon />}
							fullWidth
						>
							Sube un documento
							<input
								hidden
								accept='.doc,.docx,.pdf,.txt'
								type='file'
								onChange={handleDocumentChange}
							/>
						</Button>
						<FormHelperText>
							Tip: Puedes arrastrar el documento al botón
						</FormHelperText>
					</Paper>
					{watch('documentLoaded') && document && (
						<Paper sx={{ p: '1rem' }}>
							<Typography variant='h6'>
								Documento elegido
							</Typography>
							<Box p={2} bgcolor='gray' borderRadius={10}>
								<Box
									display='flex'
									flexDirection='row'
									justifyContent='space-evenly'
								>
									<Typography>Nombre del archivo</Typography>
									<Typography>{document.name}</Typography>
								</Box>
							</Box>
						</Paper>
					)}

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
