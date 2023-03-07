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
}

export default function SimpleScore({ algorithmScore }: SimpleScoreProps) {
	const { name, score, unit, max, min } = algorithmScore;
	const [realValue, setRealValue] = useState(0);

	const label = () => {
		if (score.level) {
			return `${score.value.toFixed(2)} / ${max}`;
		}
		return `${score.value.toFixed(2)}`;
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setRealValue(score.value);
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [score.value]);

	return (
		<GridV1 item xs={1}>
			<Paper sx={{ p: '1rem' }} elevation={3}>
				<Stack direction='column' spacing='0.75rem'>
					<Box>
						<Typography fontSize={20} fontWeight='bold'>
							{name}
						</Typography>

						<GridV2 container spacing={2}>
							<GridV2>
								<Chip label={label()} />
							</GridV2>
							<GridV2>
								<Chip label={unit} />
							</GridV2>
							<ScoreExtras extra={score.extra} />
						</GridV2>
					</Box>

					{score.level && (
						<Box>
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
							<Typography>Nivel: {score.level}</Typography>
						</Box>
					)}
				</Stack>
			</Paper>
		</GridV1>
	);
}
