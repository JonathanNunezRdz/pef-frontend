import Container from '@mui/material/Container';
import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<Container maxWidth='md'>{children}</Container>
		</>
	);
}
