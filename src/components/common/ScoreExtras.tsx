import { ScoreExtra } from '@/types';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Unstable_Grid2';

interface ScoreExtrasProps {
	extra?: ScoreExtra;
}

export default function ScoreExtras({ extra }: ScoreExtrasProps) {
	if (typeof extra === 'undefined') return null;
	return (
		<>
			{Object.entries(extra).map(([_, { label, value }]) => {
				return (
					<Grid key={label}>
						<Chip label={`${label}: ${value}`} />
					</Grid>
				);
			})}
		</>
	);
}
