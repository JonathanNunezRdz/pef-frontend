import Container from '@mui/material/Container';
import Header from './Header';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<Container maxWidth='md' sx={{ my: '1rem' }}>
				{children}
			</Container>
		</>
	);
}
