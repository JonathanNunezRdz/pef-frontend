import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import Logo from '../../../../public/static/images/logo/logo_white.png';

interface HomeTitleProps {}

export default function HomeTitle({}: HomeTitleProps) {
	return (
		<Box>
			<Box display='flex' alignItems='end' gap='1rem'>
				<Box>
					<Image
						src={Logo}
						alt='logo de la aplicacion'
						height={Logo.height * 0.5}
						width={Logo.width * 0.5}
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
