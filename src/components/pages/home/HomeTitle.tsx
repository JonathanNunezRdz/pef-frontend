import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface HomeTitleProps {}

export default function HomeTitle({}: HomeTitleProps) {
	return (
		<Box>
			<Box display='flex' alignItems='end' gap={2}>
				<Box>
					<Image
						src='/static/images/logo/logo_white.png'
						alt='logo de la aplicación'
						width={100}
						height={55}
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
