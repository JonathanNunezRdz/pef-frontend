import { BaseAlgorithmScore } from '@/types';
import { Box, Button, Grid, Typography } from '@mui/material';

import SimpleScore from '@/components/common/SimpleScore';

interface TableExampleProps {
	title?: string;
	scores: BaseAlgorithmScore[];
	buttonCallback?: () => void;
}

export default function AlgorithmScores({
	title = 'Puntajes de algoritmos',
	scores,
	buttonCallback,
}: TableExampleProps) {
	const [udemScore, ...rest] = scores;
	return (
		<Grid container columns={{ xs: 1, sm: 2 }} spacing={2}>
			<Grid item xs={1}>
				<Typography variant='h6'>{title}</Typography>
			</Grid>

			{buttonCallback && (
				<Grid item xs={1}>
					<Box textAlign='right'>
						<Button
							onClick={buttonCallback}
							variant='contained'
							color='secondary'
						>
							Hacer otro análisis
						</Button>
					</Box>
				</Grid>
			)}

			<SimpleScore algorithmScore={udemScore} fullWidth />

			{rest.map((score) => (
				<SimpleScore key={score.id} algorithmScore={score} />
			))}
		</Grid>
	);
}
