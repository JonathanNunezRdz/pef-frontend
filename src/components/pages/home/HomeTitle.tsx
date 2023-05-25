import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface HomeTitleProps {}

export default function HomeTitle({}: HomeTitleProps) {
	const height = 100;
	return (
		<Box>
			<Box display='flex' alignItems='end' gap={2}>
				<Box>
					<Image
						src='/static/images/logo/logo.png'
						alt='logo de la aplicación'
						width={height * 1.65}
						height={height}
					/>
				</Box>
				<Typography
					variant='subtitle1'
					color={(theme) => theme.palette.text.disabled}
				>
					Analizador de legibilidad de texto en español castellano.
				</Typography>
			</Box>
		</Box>
	);
}
