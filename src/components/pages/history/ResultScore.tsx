import CustomScoreBar from '@/components/common/CustomScoreBar';
import { GetAnalysisResponse } from '@/types';
import { getPoints, getScoreLabel } from '@/utils';
import { Box, Grid, Typography } from '@mui/material';

interface ResultScoreProps {
	score: GetAnalysisResponse['data'][0]['scores'][0];
	fullWidth?: boolean;
}

export default function ResultScore({
	score,
	fullWidth = false,
}: ResultScoreProps) {
	return (
		<Grid item xs={1} sm={fullWidth ? 2 : undefined}>
			<Box p={1}>
				<Box display='flex' alignItems='center' gap={1}>
					<Typography
						fontSize='16px'
						fontStyle='italic'
						color={(theme) => theme.palette.grey['400']}
					>
						Algoritmo
					</Typography>
					<Typography>{score.algorithm.name}</Typography>
				</Box>
				<CustomScoreBar
					value={getPoints(
						score.value,
						score.algorithm.max,
						!Boolean(score.dificulty)
					)}
					label={getScoreLabel(score)}
				/>
			</Box>
		</Grid>
	);
}
