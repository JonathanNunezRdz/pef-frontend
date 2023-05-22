import Card from '@/components/common/Card';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { resetAnalysisApi, useGetAnalysisQuery } from '@/store/analysis';
import { selectAuth } from '@/store/auth/authReducer';
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Pagination,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
	changePage,
	resetAnalysisReducer,
	selectAnalysisResults,
} from '@/store/analysis/analysisReducer';
import HistoryResult from './HistoryResult';
import Notification from '@/components/common/Notification';

export default function Historial() {
	// nextjs hooks
	const router = useRouter();

	// rtk hooks
	const dispatch = useAppDispatch();
	const { isLoggedIn, checkedToken } = useAppSelector(selectAuth);
	const { pageSize, currentPage } = useAppSelector(selectAnalysisResults);

	const {
		data: analysis,
		isLoading,
		isFetching,
		isSuccess,
		refetch,
	} = useGetAnalysisQuery(
		{
			limit: pageSize,
			page: currentPage,
		},
		{
			skip: !isLoggedIn,
		}
	);

	// react hooks
	const [showDeleteSucess, setShowDeleteSuccess] = useState(false);

	// functions
	const handleChangePage = (_: unknown, page: number) => {
		dispatch(changePage(page));
	};
	const handleClose = () => setShowDeleteSuccess(false);

	// effects
	useEffect(() => {
		if (checkedToken && !isLoggedIn && router.isReady) {
			router.push('/');
		}
	}, [checkedToken, isLoggedIn, router]);

	useEffect(() => {
		return () => {
			if (!isLoggedIn) {
				dispatch(resetAnalysisApi());
				dispatch(resetAnalysisReducer());
			}
		};
	}, [isLoggedIn, dispatch]);

	// render
	return (
		<Stack spacing={4}>
			<Box>
				<Box>
					<Typography variant='h3'>
						Historial de resultados
					</Typography>
				</Box>
				<Box>
					<Typography>
						Aquí puedes ver guardados todos los resultados de los
						análisis que has realizado con tu cuenta. Tienes la
						posibilidad de editar su título o hasta puedes eliminar
						un resultado.
					</Typography>
				</Box>
			</Box>

			<Button
				variant='contained'
				color='secondary'
				endIcon={<ReplayIcon />}
				aria-label='voler a cargar'
				onClick={() => refetch()}
			>
				Volver a cargar
			</Button>

			<Box display='flex' justifyContent='center'>
				<Pagination
					count={
						isSuccess
							? Math.ceil(analysis.totalAnalysis / pageSize)
							: 0
					}
					page={currentPage}
					onChange={handleChangePage}
				/>
			</Box>

			{(isLoading || isFetching) && (
				<Card
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<CircularProgress />
				</Card>
			)}

			{isSuccess &&
				analysis.data.length > 0 &&
				analysis.data.map((result) => (
					<HistoryResult
						key={result.id}
						result={result}
						onDelete={() => setShowDeleteSuccess(true)}
					/>
				))}

			{isSuccess && analysis.data.length === 0 && (
				<Card>
					<Typography>No has realizado ningún análisis.</Typography>
				</Card>
			)}

			<Box display='flex' justifyContent='center'>
				<Pagination
					count={
						isSuccess
							? Math.ceil(analysis.totalAnalysis / pageSize)
							: 0
					}
					page={currentPage}
					onChange={handleChangePage}
				/>
			</Box>

			<Notification
				type='success'
				open={showDeleteSucess}
				onClose={handleClose}
				autoHideDuration={6000}
				message='Se ha eliminado el resultado exitosamente'
			/>
		</Stack>
	);
}
