import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

import AnalyzeTabs from './AnalyzeTabs';

import Card from '@/components/common/Card';
import {
	useAddAnalysisMutation,
	useAddAnalysisWithFileMutation,
	useAddAnalysisWithUrlMutation,
} from '@/store/analysis/analysisApi';
import Logo from '../../../../public/static/images/logo/logo_white.png';
import { AnalysisErrorResponse, AnalysisResult } from '@/types';
import ShowAnalysisResult from './ShowAnalysisResult';
import { parseErrorResponse } from '@/utils';
import AnalysisError from './AnalysisError';
import HomeTitle from './HomeTitle';

export default function Home() {
	// redux hooks
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
	const showTabs = () => {
		if (!postAnalysisResult.isUninitialized) return false;
		if (!postAnalysisWithFileResult.isUninitialized) return false;
		if (!postAnalysisWithUrlResult.isUninitialized) return false;
		return true;
	};
	const showLoading = () => {
		if (postAnalysisResult.isLoading) return true;
		if (postAnalysisWithFileResult.isLoading) return true;
		if (postAnalysisWithUrlResult.isLoading) return true;
		return false;
	};
	const activeResult: AnalysisResult = (() => {
		if (postAnalysisResult.isSuccess) return postAnalysisResult.data;
		if (postAnalysisWithFileResult.isSuccess)
			return postAnalysisWithFileResult.data;
		if (postAnalysisWithUrlResult.isSuccess)
			return postAnalysisWithUrlResult.data;
		return undefined;
	})();
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
			{showTabs() && <AnalyzeTabs />}

			{/* loading component */}
			{showLoading() && (
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
			{activeResult && (
				<ShowAnalysisResult
					result={activeResult}
					handleResetAnalysis={handleResetPost}
				/>
			)}

			{/* show error */}
			{activeError && <AnalysisError error={activeError} />}
		</Stack>
	);
}
