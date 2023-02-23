import { Score } from '@/types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScoreBar from './ScoreBar';
import { useEffect, useState } from 'react';

interface SimpleScoreProps {
	score: Score['score'];
	name: string;
	dificulty?: string;
}

export default function SimpleScore({
	score,
	name,
	dificulty,
}: SimpleScoreProps) {
	const [realValue, setRealValue] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setRealValue(score);
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [score]);
	return (
		<Grid item xs={1}>
			<Paper sx={{ p: '1rem' }} elevation={3}>
				<Box display='flex' justifyContent='space-between'>
					<Typography>{name}</Typography>
					<Typography>{score}</Typography>
				</Box>
				<Typography>Dificultad: {dificulty}</Typography>
				<ScoreBar
					value={realValue}
					sx={{
						height: '15px',
						borderRadius: '10px',
					}}
				/>
			</Paper>
		</Grid>
	);
}
