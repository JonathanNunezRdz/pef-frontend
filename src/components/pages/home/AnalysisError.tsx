import Card from '@/components/common/Card';
import { AnalysisErrorResponse } from '@/types';
import { Button, Typography } from '@mui/material';

import { Fragment } from 'react';

interface AnalysisErrorProps {
	error: AnalysisErrorResponse;
	handleResetAnalysis: () => void;
}

export default function AnalysisError({
	error,
	handleResetAnalysis,
}: AnalysisErrorProps) {
	return (
		<Fragment>
			<Card>
				<Typography variant='h5'>Error!</Typography>
			</Card>
			<Card>
				<Typography>{error.message}</Typography>
				<Typography>{error.code}</Typography>
			</Card>
			<Card
				paperProps={{
					sx: {
						flexDirection: 'row-reverse',
						display: 'flex',
					},
				}}
			>
				<Button
					onClick={handleResetAnalysis}
					variant='contained'
					color='secondary'
				>
					Regresar
				</Button>
			</Card>
		</Fragment>
	);
}
