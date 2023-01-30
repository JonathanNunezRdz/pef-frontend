import Copyright from '@/components/common/Copyright';
import Link, { NextLinkComposed } from '@/components/common/Link';
import ProTip from '@/components/common/ProTip';
import { Box, Button, Container, Typography } from '@mui/material';

export default function Home() {
	return (
		<Container maxWidth='lg'>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant='h4' component='h1' gutterBottom>
					Estan chidos los colores
				</Typography>
				<Button
					color='secondary'
					variant='contained'
					component={NextLinkComposed}
					to={{ pathname: '/wololo', query: { name: 'test' } }}
				>
					Este es un link heh
				</Button>
				<ProTip />
				<Copyright />
			</Box>
		</Container>
	);
}
