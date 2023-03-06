import { BaseAlgorithmScore } from '@/types';
import { Grid, Typography } from '@mui/material';

import SimpleScore from '@/components/common/SimpleScore';

interface TableExampleProps {
	title?: string;
	scores: BaseAlgorithmScore[];
}

export default function AlgorithmScores({
	title = 'Puntajes de algoritmos',
	scores,
}: TableExampleProps) {
	return (
		<Grid container columns={{ xs: 1, sm: 2 }} spacing='1rem'>
			<Grid item xs={1} sm={2}>
				<Typography variant='h6'>{title}</Typography>
			</Grid>
			{scores.map((score) => (
				<SimpleScore key={score.id} algorithmScore={score} />
			))}
		</Grid>
	);
}
