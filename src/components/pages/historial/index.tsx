import Card from '@/components/common/Card';
import { useAppSelector } from '@/hooks';
import { useGetAnalysisQuery } from '@/store/analysis';
import { selectAuth } from '@/store/auth/authReducer';
import {
	Box,
	CircularProgress,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Historial() {
	// nextjs hooks
	const router = useRouter();

	// rtk hooks
	const { isLoggedIn } = useAppSelector(selectAuth);

	const {
		data: analysis,
		isLoading,
		isFetching,
		isSuccess,
		refetch,
	} = useGetAnalysisQuery({
		limit: 9,
		page: 1,
	});

	// effects
	useEffect(() => {
		if (!isLoggedIn && router.isReady) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	// render
	return (
		<Stack direction='column' spacing={4}>
			<Box>
				<Box display='flex' alignItems='center' gap={4}>
					<Typography variant='h3'>Historial de analysis</Typography>
					<IconButton
						aria-label='volver a cargar'
						onClick={() => refetch()}
					>
						<ReplayIcon fontSize='inherit' />
					</IconButton>
				</Box>
			</Box>

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

			{isSuccess && analysis.data.length > 0 && (
				<Card>
					{analysis.data.map((item) => (
						<Box key={item.id}>
							<Typography>{item.description}</Typography>
						</Box>
					))}
				</Card>
			)}

			{isSuccess && analysis.data.length === 0 && (
				<Card>
					<Typography>No has hecho ningún análisis.</Typography>
				</Card>
			)}
		</Stack>
	);
}
