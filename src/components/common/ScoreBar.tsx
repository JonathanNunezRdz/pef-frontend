import { Box, Typography } from '@mui/material';
import LinearProgress, {
	LinearProgressProps,
} from '@mui/material/LinearProgress';

interface ScoreBarProps extends LinearProgressProps {
	value: number;
}

// 100-80 green
// 80-60 lime
// 60-40 yellow
// 40-20 orange
// 20-0 red

export default function ScoreBar(props: ScoreBarProps) {
	const { value, ...rest } = props;
	const realValue = Math.min(value, 100);
	const getColor = () => {
		if (realValue <= 20) return 'error';
		if (realValue <= 40) return 'warning';
		if (realValue <= 60) return 'mustard';
		if (realValue <= 80) return 'lime';
		return 'success';
	};
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress
					variant='determinate'
					color={getColor()}
					value={realValue}
					{...rest}
				/>
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography
					variant='body2'
					color='text.secondary'
				>{`${Math.round(realValue)}%`}</Typography>
			</Box>
		</Box>
	);
}
