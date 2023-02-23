import { AllScores } from '@/types';
import { Grid, Typography } from '@mui/material';

import SimpleScore from '@/components/common/SimpleScore';

interface TableExampleProps {
	title?: string;
	scores: AllScores;
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
			<SimpleScore
				score={scores.fHuerta.score}
				name='Fernandez Huerta'
				dificulty={scores.fHuerta.difficulty}
			/>
			<SimpleScore
				score={scores.gPolini.score}
				name='Gutiérrez de Polini'
				dificulty={scores.gPolini.difficulty}
			/>
			<SimpleScore
				score={scores.sPazos.score}
				name='Szigriszt-Pazos'
				dificulty={scores.sPazos.difficulty}
			/>
			<SimpleScore
				score={scores.inflesz.score}
				name='Inflesz'
				dificulty={scores.inflesz.difficulty}
			/>
			<SimpleScore
				score={scores.mu.score}
				name='Legibilidad μ'
				dificulty={scores.mu.difficulty}
			/>
			<SimpleScore score={scores.crawford.years} name='Crawford' />
		</Grid>
	);
}
