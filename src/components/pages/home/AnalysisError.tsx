import Card from '@/components/common/Card';
import { AnalysisErrorResponse } from '@/types';
import { Box, Typography } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Fragment } from 'react';

interface AnalysisErrorProps {
	error: AnalysisErrorResponse;
}

export default function AnalysisError({ error }: AnalysisErrorProps) {
	return (
		<Fragment>
			<Card>
				<Typography variant='h5'>Error!</Typography>
			</Card>
			<Card>
				<Typography>{error.message}</Typography>
				<Typography>{error.code}</Typography>
			</Card>
		</Fragment>
	);
}
