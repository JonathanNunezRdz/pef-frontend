import Card from '@/components/common/Card';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { resetAnalysisApi, useGetAnalysisQuery } from '@/store/analysis';
import { selectAuth } from '@/store/auth/authReducer';
import {
	Box,
	Button,
	CircularProgress,
	Stack,
	Typography,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { resetAnalysisReducer } from '@/store/analysis/analysisReducer';
import HistoryResult from './HistoryResult';

export default function Historial() {
	// nextjs hooks
	const router = useRouter();

	// rtk hooks
	const dispatch = useAppDispatch();
	const { isLoggedIn, checkedToken } = useAppSelector(selectAuth);

	const {
		data: analysis,
		isLoading,
		isFetching,
		isSuccess,
		refetch,
	} = useGetAnalysisQuery(
		{
			limit: 9,
			page: 1,
		},
		{
			skip: !isLoggedIn,
		}
	);

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
		<Stack direction='column' spacing={4}>
			<Box mt={1}>
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

			{(isLoading || isFetching) && (
				<Card
					paperProps={{
						sx: {
							display: 'flex',
							justifyContent: 'center',
						},
					}}
				>
					<CircularProgress />
				</Card>
			)}

			{isSuccess &&
				analysis.data.length > 0 &&
				analysis.data.map((result) => (
					<HistoryResult key={result.id} result={result} />
				))}

			{isSuccess && analysis.data.length === 0 && (
				<Card>
					<Typography>No has realizado ningún análisis.</Typography>
				</Card>
			)}
		</Stack>
	);
}
