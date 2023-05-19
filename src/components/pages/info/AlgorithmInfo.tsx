import { AlgorithmWithScale } from '@/types';
import { ALGORITHM_NAMES } from '@/utils';
import { Box, Typography } from '@mui/material';
import Tex2SVG from 'react-hook-mathjax';
import InterpretationTable from './InterpretationTable';

interface AlgorithmInfoProps {
	algorithm: AlgorithmWithScale;
}

export default function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
	return (
		<Box>
			<Typography fontStyle='italic' variant='h6' component='h4'>
				Algoritmo de {algorithm.name}
			</Typography>
			<Typography pl={4} component='div'>
				{ALGORITHM_NAMES[algorithm.name].forms.map((form) => (
					<Box key={form.displayFormula} my={1}>
						{form.explanation && (
							<Typography mt={1}>{form.explanation}</Typography>
						)}
						<Tex2SVG display='inline' latex={form.displayFormula} />
					</Box>
				))}
			</Typography>
			<Typography component='div'>
				donde:
				<ul>
					{ALGORITHM_NAMES[algorithm.name].letterMeanings.map(
						(meaning) => (
							<li key={meaning.letter}>
								<Tex2SVG
									display='inline'
									latex={meaning.letter}
								/>{' '}
								= {meaning.meaning}
							</li>
						)
					)}
				</ul>
				{algorithm.scales && algorithm.scales.length > 0 && (
					<>
						y su tabla de interpretación:
						<InterpretationTable scales={algorithm.scales} />
					</>
				)}
			</Typography>
		</Box>
	);
}
