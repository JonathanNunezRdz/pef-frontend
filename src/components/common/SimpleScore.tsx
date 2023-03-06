import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScoreBar from './ScoreBar';
import { useEffect, useState } from 'react';
import { BaseAlgorithmScore } from '@/types';
import { Chip } from '@mui/material';

interface SimpleScoreProps {
	algorithmScore: BaseAlgorithmScore;
}

export default function SimpleScore({ algorithmScore }: SimpleScoreProps) {
	const { name, score, unit, max } = algorithmScore;
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
		<Grid item xs={1}>
			<Paper sx={{ p: '1rem' }} elevation={3}>
				<Box>
					<Typography variant='subtitle1'>{name}</Typography>
					<Box display='flex' alignItems='center'>
						<Chip label={label()} sx={{ mr: '1rem' }} />
						<Typography>{unit}</Typography>
					</Box>
				</Box>
				{score.level && (
					<>
						<Typography>Nivel: {score.level}</Typography>
						<ScoreBar
							value={realValue}
							sx={{
								height: '15px',
								borderRadius: '10px',
							}}
						/>
					</>
				)}
			</Paper>
		</Grid>
	);
}
