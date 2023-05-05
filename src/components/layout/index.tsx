import Container from '@mui/material/Container';
import Header from './Header';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getLoggedStatus, selectAuth } from '@/store/auth/authReducer';
import { useGetMeQuery } from '@/store/user';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	// rtk hooks
	const dispatch = useAppDispatch();
	const { checkedToken, isLoggedIn } = useAppSelector(selectAuth);
	const _ = useGetMeQuery(undefined, {
		skip: !isLoggedIn,
	});

	useEffect(() => {
		if (!checkedToken && !isLoggedIn) {
			dispatch(getLoggedStatus());
		}
	}, [checkedToken, isLoggedIn, dispatch]);

	return (
		<>
			<Header />
			<Container maxWidth='md' sx={{ my: '1rem' }}>
				{children}
			</Container>
		</>
	);
}
