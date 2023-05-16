import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import AnalyzeTabs from './AnalyzeTabs';

import Card from '@/components/common/Card';
import {
	useAddAnalysisMutation,
	useAddAnalysisWithFileMutation,
	useAddAnalysisWithUrlMutation,
} from '@/store/analysis';

import { AnalysisErrorResponse, AnalysisResult } from '@/types';
import ShowAnalysisResult from './ShowAnalysisResult';
import { parseErrorResponse } from '@/utils';
import AnalysisError from './AnalysisError';
import HomeTitle from './HomeTitle';
import { useAppSelector } from '@/hooks';
import { selectAnalysisStatus } from '@/store/analysis/analysisReducer';

export default function Home() {
	// redux hooks
	const { isLoading, data } = useAppSelector(selectAnalysisStatus);
	const [, postAnalysisResult] = useAddAnalysisMutation({
		fixedCacheKey: 'raw',
	});
	const [, postAnalysisWithFileResult] = useAddAnalysisWithFileMutation({
		fixedCacheKey: 'file',
	});
	const [, postAnalysisWithUrlResult] = useAddAnalysisWithUrlMutation({
		fixedCacheKey: 'url',
	});

	// react hooks
	const activeError: AnalysisErrorResponse | false = (() => {
		if (postAnalysisResult.isError)
			return parseErrorResponse(postAnalysisResult.error);
		if (postAnalysisWithFileResult.isError)
			return parseErrorResponse(postAnalysisWithFileResult.error);
		if (postAnalysisWithUrlResult.isError)
			return parseErrorResponse(postAnalysisWithUrlResult.error);
		return false;
	})();

	// functions
	const handleResetPost = () => {
		postAnalysisResult.reset();
		postAnalysisWithFileResult.reset();
		postAnalysisWithUrlResult.reset();
	};

	return (
		<Stack direction='column' spacing='1rem'>
			{/* page title */}
			<HomeTitle />

			{/* main content - analyze text tabs*/}
			<AnalyzeTabs />

			{/* loading component */}
			{isLoading && (
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
