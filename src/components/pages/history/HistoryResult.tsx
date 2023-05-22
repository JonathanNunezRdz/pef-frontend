import Card from '@/components/common/Card';
import CustomScoreBar from '@/components/common/CustomScoreBar';
import { GetAnalysisResponse } from '@/types';
import { MONTH_LABELS, getPoints } from '@/utils';
import {
	Alert,
	Box,
	Grid,
	IconButton,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ResultScore from './ResultScore';
import { useState } from 'react';
import ResultEditForm from './ResultEditForm';
import ResultDeleteModal from './ResultDeleteModal';

interface HistoryResultProps {
	result: GetAnalysisResponse['data'][0];
	onDelete?: () => void;
}

export default function HistoryResult({
	result,
	onDelete,
}: HistoryResultProps) {
	// react hooks
	const [isEditMode, setIsEditMode] = useState(false);
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	// functions
	const handleClose = () => setShowSuccess(false);

	const { scores } = result;
	const [udemScore, ...rest] = scores;

	return (
		<Card>
			<Stack spacing={2}>
				<ResultDeleteModal
					isOpen={isDeleteMode}
					handleClose={() => setIsDeleteMode(false)}
					resultId={result.id}
					title={result.description}
					onDelete={onDelete}
				/>
				<Box
					display='flex'
					alignItems='start'
					justifyContent='space-between'
					gap={1}
				>
					<Box flex='auto'>
						{isEditMode ? (
							<ResultEditForm
								resultId={result.id}
								originalDescription={result.description}
								onSuccess={() => {
									setIsEditMode(false);
									setShowSuccess(true);
								}}
							/>
						) : (
							<Typography variant='h5'>
								{result.description}
							</Typography>
						)}

						<Typography
							fontSize='16px'
							fontStyle='italic'
							color={(theme) => theme.palette.grey['400']}
						>
							Análisis realizado el{' '}
							{new Date(result.createdAt).getDate()} de{' '}
							{
								MONTH_LABELS[
									new Date(result.createdAt).getMonth()
								]
							}{' '}
							del {new Date(result.createdAt).getFullYear()}
						</Typography>
					</Box>
					<Box display='flex' gap={1}>
						<IconButton
							sx={{
								backgroundColor: 'gray',
								borderRadius: '10px',
								height: '50px',
								width: '50px',
							}}
							onClick={() => setIsEditMode((edit) => !edit)}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							sx={{
								backgroundColor: 'gray',
								borderRadius: '10px',
								height: '50px',
								width: '50px',
							}}
							onClick={() => setIsDeleteMode(true)}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
				</Box>
				<Box>
					<Typography variant='h6'>Calificaciones</Typography>
					<Grid
						container
						columns={{ xs: 1, md: 2 }}
						rowSpacing={0}
						columnSpacing={2}
					>
						<ResultScore score={udemScore} fullWidth />

						{rest.map((score) => (
							<ResultScore key={score.id} score={score} />
						))}
					</Grid>
				</Box>
				<Snackbar
					open={showSuccess}
					onClose={handleClose}
					autoHideDuration={6000}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert
						onClose={handleClose}
						severity='success'
						sx={{ width: '100%' }}
					>
						Se ha editado el título exitosamente
					</Alert>
				</Snackbar>
			</Stack>
		</Card>
	);
}
