import { Box, BoxProps } from '@mui/material';
import Image from 'next/image';

interface LogoProps extends BoxProps {}

export default function Logo(props: LogoProps) {
	return (
		<Box {...props}>
			<Image
				src='/static/images/logo/logo-main.png'
				alt='udem logo'
				width={100}
				height={50}
			/>
		</Box>
	);
}
