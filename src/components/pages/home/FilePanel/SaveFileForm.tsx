import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useSaveAnalysisWithFileMutation } from '@/store/analysis';
import { SaveAnalysisWithFileDto } from '@/types';
import { mimeTypeRegexp } from '@/utils';
import { ChangeEvent, useState } from 'react';
import {
	Controller,
	FieldErrors,
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import Card from '@/components/common/Card';

interface SaveFileFormProps {}

export default function SaveFileForm({}: SaveFileFormProps) {
	// rtk hooks
	const [saveAnalysis] = useSaveAnalysisWithFileMutation();

	// react hooks
	const [document, setDocument] = useState<File>();

	// react hook form
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		register,
		formState: { errors },
	} = useForm<SaveAnalysisWithFileDto>({
		defaultValues: {
			numOfSamples: 5,
			documentLoaded: false,
			description: '',
		},
		resolver: (values) => {
			const errors: FieldErrors<SaveAnalysisWithFileDto> = {};
			const validValues: FieldValues = { ...values };
			if (!values.documentLoaded) {
				errors.documentLoaded = {
					type: 'required',
					message: 'Este campo es obligatorio',
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
	const onSubmit: SubmitHandler<SaveAnalysisWithFileDto> = (data) => {
		if (!document) return;
		saveAnalysis({
			document,
			numOfSamples: data.numOfSamples,
			description: data.description,
		});
	};
	const handleDocumentChange = async (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const { files } = event.currentTarget;
		if (!files || !files[0]) return;
		const format = files[0].type;
		if (!mimeTypeRegexp.test(format)) return;
		setDocument(files[0]);
		setValue('documentLoaded', true);
	};

	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<Paper sx={{ p: 2 }}>
						<Box>
							<Typography component='div'>
								Formatos aceptados:
								<ul style={{ marginTop: 0 }}>
									<li>Archivo PDF (.pdf)</li>
									<li>
										Archivo Microsoft Word (.doc o .docx)
									</li>
									<li>Archivo de texto (.txt)</li>
								</ul>
							</Typography>
						</Box>
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
					</Paper>
					{watch('documentLoaded') && document && (
						<Paper sx={{ p: 2 }}>
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
