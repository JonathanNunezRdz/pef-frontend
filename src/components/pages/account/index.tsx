import { useAppDispatch, useAppSelector } from '@/hooks';
import { resetAnalysisApi } from '@/store/analysis';
import { resetAnalysisReducer } from '@/store/analysis/analysisReducer';
import { selectAuth } from '@/store/auth/authReducer';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BasicInformation from './BasicInformation';
import SensitiveInformation from './SensitiveInformation';

interface AccountProps {}

export default function Account({}: AccountProps) {
	// nextjs hooks
	const router = useRouter();

	// rtk hooks
	const dispatch = useAppDispatch();
	const { isLoggedIn, checkedToken } = useAppSelector(selectAuth);

	// effects
	// redirect if user is not logged in
	useEffect(() => {
		if (checkedToken && !isLoggedIn && router.isReady) {
			router.push('/');
		}
	}, [checkedToken, isLoggedIn, router]);

	// when componen unmounts and user is no longer logged in,
	// remove all data stored in redux
	useEffect(() => {
		return () => {
			if (!isLoggedIn) {
				dispatch(resetAnalysisApi());
				dispatch(resetAnalysisReducer());
			}
		};
	}, [isLoggedIn, dispatch]);

	// render
	return (
		<Stack spacing={4}>
			<Box>
				<Box>
					<Typography variant='h3'>Mi cuenta</Typography>
				</Box>
				<Box>
					<Typography>
						Aquí puedes ver la información de tu cuenta. Tienes la
						posibilidad de editar tu nombre y apellido. Esta
						información solo la puedes ver tu.
					</Typography>
				</Box>
			</Box>

			<BasicInformation />

			<Box>
				<Typography>
					En este apartado puedes cambiar tu contraseña.
				</Typography>
			</Box>

			<SensitiveInformation />
		</Stack>
	);
}
