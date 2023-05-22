import Paper, { PaperProps } from '@mui/material/Paper';

interface CardProps extends PaperProps {}

export default function Card({ children, sx, ...rest }: CardProps) {
	const sxProps: PaperProps['sx'] = {
		p: 2,
		...sx,
	};
	return (
		<Paper {...rest} sx={sxProps}>
			{children}
		</Paper>
	);
}
