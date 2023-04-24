import Card from '@/components/common/Card';
import { AnalysisResponse } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import AlgorithmScores from './AlgorithmScores';

interface ShowAnalysisResultProps {
	result: AnalysisResponse;
	handleResetAnalysis: () => void;
}

export default function ShowAnalysisResult({
	result,
	handleResetAnalysis,
}: ShowAnalysisResultProps) {
	return (
		<Box>
			<Card>
				<Typography variant='h5'>Resultados</Typography>
			</Card>
			<Card>
				<AlgorithmScores scores={result.scores} />
			</Card>
			<Card>
				<Typography variant='h6'>Estadisticos</Typography>
				{Object.entries(result.metrics).map(([key, value]) => {
					return (
						<Box key={key}>
							<Typography>
								{key}: {value.toFixed(2)}
							</Typography>
						</Box>
					);
				})}
			</Card>
			<Card>
				<Typography variant='h6'>Texto original</Typography>
				<Card paperProps={{ elevation: 3 }}>
					<Typography>{result.originalText}</Typography>
				</Card>
			</Card>
			<Card
				paperProps={{
					sx: {
						flexDirection: 'row-reverse',
						display: 'flex',
					},
				}}
			>
				<Button
					onClick={handleResetAnalysis}
					variant='contained'
					color='secondary'
				>
					Hacer otro analisis
				</Button>
			</Card>
		</Box>
	);
}
