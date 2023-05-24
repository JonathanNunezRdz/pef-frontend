import Card from '@/components/common/Card';
import ScoreBar from '@/components/common/ScoreBar';
import ScoreExtras from '@/components/common/ScoreExtras';
import { GetAnalysisResponse } from '@/types';
import { Box, Chip, Stack, Typography } from '@mui/material';
import GridV1 from '@mui/material/Grid';
import GridV2 from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

interface ResultScoreProps {
	score: GetAnalysisResponse['data'][0]['scores'][0];
}

export default function ResultScore({ score }: ResultScoreProps) {
	const [realValue, setRealValue] = useState(0);

	const label = () => {
		if (score.dificulty) {
			return (
				<>
					<Typography fontWeight='bold' component='span'>
						{score.value.toFixed(2)} / {score.algorithm.max}
					</Typography>{' '}
					{score.algorithm.unit}
				</>
			);
		}
		return (
			<>
				<Typography fontWeight='bold' component='span'>
					{score.value.toFixed(2)}
				</Typography>{' '}
				{score.algorithm.unit}
			</>
		);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setRealValue(score.value);
		}, 50);
		return () => {
			clearTimeout(timeout);
		};
	}, [score.value]);

	return (
		<Card elevation={3}>
			<Stack spacing={1}>
				<Box>
					<Typography fontSize={20} fontWeight='bold'>
						{score.algorithm.name}
					</Typography>
				</Box>
				<Box>
					<GridV2 container spacing={1}>
						<GridV2>
							<Chip label={label()} />
						</GridV2>
					</GridV2>
				</Box>

				{score.dificulty && (
					<Box>
						<Typography>Nivel: {score.dificulty}</Typography>
						<ScoreBar
							value={realValue}
							sx={{ height: '25px', borderRadius: '10px' }}
						/>
						<Box display='flex' justifyContent='space-between'>
							<Typography>{0}</Typography>
							<Typography>{score.algorithm.max}</Typography>
						</Box>
					</Box>
				)}
			</Stack>
		</Card>
	);
}
