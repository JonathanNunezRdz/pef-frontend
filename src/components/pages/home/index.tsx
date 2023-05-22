import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AnalyzeTabs from './AnalyzeTabs';
import Card from '@/components/common/Card';
import ShowAnalysisResult from './ShowAnalysisResult';
import AnalysisError from './AnalysisError';
import HomeTitle from './HomeTitle';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
	resetAnalysisReducer,
	selectAnalysisStatus,
} from '@/store/analysis/analysisReducer';
import { resetAnalysisApi } from '@/store/analysis';

export default function Home() {
	// redux hooks
	const dispatch = useAppDispatch();
	const {
		isLoading,
		data,
		error: activeError,
	} = useAppSelector(selectAnalysisStatus);

	const handleResetPost = () => {
		dispatch(resetAnalysisApi());
		dispatch(resetAnalysisReducer());
	};

	return (
		<Stack spacing={2}>
			{/* page title */}
			<HomeTitle />

			{/* main content - analyze text tabs*/}
			<AnalyzeTabs />

			{/* loading component */}
			{isLoading && (
				<Card
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<CircularProgress />
				</Card>
			)}

			{/* show analysis result */}
			{data && (
				<ShowAnalysisResult
					result={data}
					handleResetAnalysis={handleResetPost}
				/>
			)}

			{/* show error */}
			{activeError && (
				<AnalysisError
					error={activeError}
					handleResetAnalysis={handleResetPost}
				/>
			)}
		</Stack>
	);
}
