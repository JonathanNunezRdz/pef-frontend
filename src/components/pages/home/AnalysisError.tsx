import Card from '@/components/common/Card';
import { Box, Typography } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Fragment } from 'react';

interface AnalysisErrorProps {
	error: FetchBaseQueryError | SerializedError;
}

export default function AnalysisError({}: AnalysisErrorProps) {
	return (
		<Fragment>
			<Card>
				<Typography variant='h5'>Error!</Typography>
			</Card>
			<Card>
				<Typography>
					{'status' in postAnalysisResult.error
						? JSON.stringify(postAnalysisResult.error.data)
						: JSON.stringify(postAnalysisResult.error)}
				</Typography>
			</Card>
		</Fragment>
	);
}
