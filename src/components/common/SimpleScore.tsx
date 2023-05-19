import GridV1 from '@mui/material/Grid';
import GridV2 from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScoreBar from './ScoreBar';
import { useEffect, useState } from 'react';
import { BaseAlgorithmScore } from '@/types';
import { Chip, Stack } from '@mui/material';
import ScoreExtras from './ScoreExtras';

interface SimpleScoreProps {
	algorithmScore: BaseAlgorithmScore;
	fullWidth?: boolean;
}

export default function SimpleScore({
	algorithmScore,
	fullWidth = false,
}: SimpleScoreProps) {
	const { name, score, unit, max, min } = algorithmScore;
	const [realValue, setRealValue] = useState(0);

	const label = () => {
		if (score.level) {
			return (
				<>
					<Typography fontWeight='bold' component='span'>
						{score.value.toFixed(2)} / {max}
					</Typography>{' '}
					{unit}
				</>
			);
		}
		return (
			<>
				<Typography fontWeight='bold' component='span'>
					{score.value.toFixed(2)}
				</Typography>{' '}
				{unit}
			</>
		);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setRealValue(score.value);
		}, 250);
		return () => {
			clearTimeout(timeout);
		};
	}, [score.value]);

	return (
		<GridV1 item xs={1} sm={fullWidth ? 2 : undefined}>
			<Paper sx={{ p: '1rem' }} elevation={3}>
				<Stack direction='column' spacing={1}>
					<Box>
						<Typography fontSize={20} fontWeight='bold'>
							{name}
						</Typography>
					</Box>
					<Box>
						<GridV2 container spacing={1}>
							<GridV2>
								<Chip label={label()} />
							</GridV2>
							<ScoreExtras extra={score.extra} />
						</GridV2>
					</Box>

					{score.level && (
						<Box>
							<Typography>Nivel: {score.level}</Typography>
							<ScoreBar
								value={realValue}
								sx={{
									height: '15px',
									borderRadius: '10px',
								}}
							/>
							<Box display='flex' justifyContent='space-between'>
								<Typography>{min}</Typography>
								<Typography>{max}</Typography>
							</Box>
						</Box>
					)}
				</Stack>
			</Paper>
		</GridV1>
	);
}
