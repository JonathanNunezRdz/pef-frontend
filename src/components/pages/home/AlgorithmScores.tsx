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
	const [udemScore, ...rest] = scores;
	return (
		<Grid container columns={{ xs: 1, sm: 2 }} spacing={2}>
			<Grid item xs={1} sm={2}>
				<Typography variant='h6'>{title}</Typography>
			</Grid>

			<SimpleScore algorithmScore={udemScore} fullWidth />

			{rest.map((score) => (
				<SimpleScore key={score.id} algorithmScore={score} />
			))}
		</Grid>
	);
}
