import Card from '@/components/common/Card';
import { PostAnalysisResponse, SaveAnalysisResponse } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import AlgorithmScores from './AlgorithmScores';
import { Fragment } from 'react';
import { useAppSelector } from '@/hooks';
import { selectAnalysisArgs } from '@/store/analysis/analysisReducer';

interface ShowAnalysisResultProps {
	result: PostAnalysisResponse | SaveAnalysisResponse;
	handleResetAnalysis: () => void;
}

export default function ShowAnalysisResult({
	result,
	handleResetAnalysis,
}: ShowAnalysisResultProps) {
	// rtk hooks
	const originalArgs = useAppSelector(selectAnalysisArgs);

	const readableNumber = (x: number) => {
		const [integer, decimal] = separateNumber(x);
		return `${integer}.${decimal}`;
	};

	return (
		<Fragment>
			<Card>
				<Typography variant='h4'>Resultados</Typography>
			</Card>

			{originalArgs && (
				<Card>
					<Typography variant='h6'>
						{originalArgs.from === 'url' ? 'Enlace' : 'Documento'}{' '}
						original
					</Typography>
					{originalArgs.from === 'url' ? (
						<Typography>
							<a
								href={originalArgs.source}
								target='_blank'
								referrerPolicy='no-referrer'
								rel='noreferrer'
								style={{ color: 'white' }}
							>
								{originalArgs.source}
							</a>
						</Typography>
					) : (
						<Typography>
							<a
								href={URL.createObjectURL(
									originalArgs.document
								)}
								download={originalArgs.document.name}
								style={{ color: 'white' }}
							>
								{originalArgs.document.name}
							</a>
						</Typography>
					)}
				</Card>
			)}

			<Card>
				<AlgorithmScores
					scores={result.scores}
					buttonCallback={handleResetAnalysis}
				/>
			</Card>

			<Card
				sx={{
					flexDirection: 'row-reverse',
					display: 'flex',
				}}
			>
				<Button
					onClick={handleResetAnalysis}
					variant='contained'
					color='secondary'
				>
					Hacer otro análisis
				</Button>
			</Card>

			<Card>
				<Typography variant='h6'>Estadísticos</Typography>
				{result.metrics.map((metric) => (
					<Box key={metric.name}>
						<Typography>
							{metric.readableName}:{' '}
							{readableNumber(metric.value)}
						</Typography>
					</Box>
				))}
			</Card>

			{result.originalText && (
				<Card>
					<Typography variant='h6'>Texto original</Typography>
					<Card elevation={3}>
						<Typography>{result.originalText}</Typography>
					</Card>
				</Card>
			)}
		</Fragment>
	);
}

function separateNumber(x: number): [string, string] {
	const pair = x.toString().split('.');
	if (pair.length === 1) pair.push('00');
	const integer = pair.shift();
	if (!integer) throw new Error('error at parsing number');
	const decimal = pair.pop();
	if (!decimal) throw new Error('error at parsing number');
	return [numberWithCommas(integer), decimal.slice(0, 2)];
}

function numberWithCommas(x: number | string) {
	x = Number(x);
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
