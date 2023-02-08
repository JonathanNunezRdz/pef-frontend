import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { FormEventHandler } from 'react';
import { FormHelperText } from '@mui/material';

interface FileTabPanelProps {}

export default function FileTabPanel({}: FileTabPanelProps) {
	// hooks

	// functions
	const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.stopPropagation();
		event.preventDefault();
		console.log(event);
	};

	// effects

	// render
	return (
		<Box>
			<form onSubmit={onSubmit}>
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
							/>
						</Button>
						<FormHelperText>
							Tip: Puedes arrastrar el documento al boton
						</FormHelperText>
					</Paper>
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
