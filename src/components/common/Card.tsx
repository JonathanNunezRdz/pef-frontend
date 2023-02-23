import Paper, { PaperProps } from '@mui/material/Paper';
import { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	paperProps?: PaperProps;
}

export default function Card({ children, paperProps }: CardProps) {
	const sxProps: PaperProps['sx'] = {
		p: '1rem',
		...paperProps?.sx,
	};
	return (
		<Paper {...paperProps} sx={sxProps}>
			{children}
		</Paper>
	);
}
