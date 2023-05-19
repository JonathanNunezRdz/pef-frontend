import { getColor, getDarkerColor } from '@/utils';
import { Box, Typography } from '@mui/material';

interface CustomScoreBarProps {
	value: number;
	label?: string;
}

export default function CustomScoreBar({ value, label }: CustomScoreBarProps) {
	const color = getColor(value);
	const darkColor = getDarkerColor(color);
	label = label || `${value.toFixed(0)}%`;
	return (
		<Box
			width='100%'
			bgcolor={darkColor}
			borderRadius='10px'
			sx={{
				transition: 'all 1s ease-in-out',
			}}
			position='relative'
			height='36px'
		>
			<Typography
				position='absolute'
				fontWeight={500}
				fontSize='1.5rem'
				// sx={{
				// 	WebkitTextStrokeWidth: '1px',
				// 	WebkitTextStrokeColor: 'black',
				// }}
				zIndex={2}
				mx={1}
				color='black'
			>
				{label}
			</Typography>
			<Box
				position='absolute'
				width={`${value}%`}
				height='36px'
				bgcolor={(theme) => theme.palette[color].main}
				sx={{
					transition: 'all 1s ease-in-out',
				}}
				borderRadius='10px'
				zIndex={1}
			></Box>
		</Box>
	);
}
