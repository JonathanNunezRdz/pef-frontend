import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import {
	useAppSelector,
	useLinks,
	useAppMediaQuery,
	useAppDispatch,
} from '@/hooks';
import { selectAuth, signOut } from '@/store/auth/authReducer';

import Link, { NextLinkComposed } from '../common/Link';
import Logo from '../common/Logo';
import { resetAllApis } from '@/store/api';

export type Page = {
	route: string;
	label: string;
};

const generalLinks: Page[] = [
	{ route: '/', label: 'Analizar' },
	{ route: '/como_funciona', label: '¿Cómo funciona?' },
];

export default function Header() {
	// redux hooks
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAppSelector(selectAuth);

	// next hooks
	const router = useRouter();

	// react hooks
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const showOnMobile = useAppMediaQuery((theme) =>
		theme.breakpoints.down('sm')
	);
	const links = useLinks(isLoggedIn);

	// functions
	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const flexOnMobile = (invert = false) => {
		if ((showOnMobile && !invert) || (!showOnMobile && invert))
			return 'flex';
		return 'none';
	};
	const isActiveLink = (pathname: string) => router.pathname === pathname;

	// render
	return (
		<AppBar
			position='static'
			enableColorOnDark
			sx={{ borderRadius: '10px' }}
		>
			<Box px='1rem'>
				<Toolbar disableGutters>
					{/* left side logo only on desktop*/}
					<Box sx={{ flexGrow: showOnMobile ? 1 : 0 }}>
						<Link href='/' display='inline-block'>
							<Logo
								sx={{
									mt: 1,
									ml: -1,
								}}
							/>
						</Link>
					</Box>

					{/* menu links only on mobile */}
					<Box display={flexOnMobile()}>
						<IconButton
							size='large'
							aria-label='menu links'
							arai-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						{/* menu */}
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: flexOnMobile(),
							}}
						>
							{/* map through links/pages */}
							{[...generalLinks, ...links].map((link) => (
								<MenuItem
									key={link.label}
									onClick={handleCloseNavMenu}
									component={NextLinkComposed}
									to={link.route}
									selected={isActiveLink(link.route)}
								>
									{link.label}
								</MenuItem>
							))}
							{/* add log out button */}
						</Menu>
					</Box>

					{/* links only on desktop */}
					<Box
						sx={{
							flexGrow: 1,
							display: flexOnMobile(true),
						}}
					>
						{/* map through links/pages */}
						{generalLinks.map((link) => (
							<Link
								key={link.route}
								color='inherit'
								href={link.route}
								underline='none'
								mx='0.5rem'
								py='0.25rem'
								px='0.5rem'
								textTransform='uppercase'
								sx={(theme) => ({
									backgroundColor: isActiveLink(link.route)
										? theme.palette.primary.dark
										: theme.palette.primary.main,
									borderRadius: '10px',
									':hover': {
										backgroundColor:
											theme.palette.primary.dark,
									},
								})}
							>
								{link.label}
							</Link>
						))}
					</Box>

					<Box
						sx={{
							flexGrow: 0,
							display: flexOnMobile(true),
							alignItems: 'center',
						}}
					>
						{links.map((link) => (
							<Link
								key={link.route}
								color='inherit'
								href={link.route}
								underline='none'
								mx='0.5rem'
								py='0.25rem'
								px='0.5rem'
								textTransform='uppercase'
								sx={(theme) => ({
									backgroundColor: isActiveLink(link.route)
										? theme.palette.primary.dark
										: theme.palette.primary.main,
									borderRadius: '10px',
									':hover': {
										backgroundColor:
											theme.palette.primary.dark,
									},
								})}
							>
								{link.label}
							</Link>
						))}
						{isLoggedIn && (
							<Button
								variant='text'
								color='inherit'
								sx={{
									mx: '0.5rem',
									py: '0.25rem',
									px: '0.5rem',
									borderRadius: '10px',
									fontWeight: 'inherit',
								}}
								onClick={() => {
									dispatch(signOut());
									dispatch(resetAllApis());
								}}
							>
								Cerrar sesión
							</Button>
						)}
						{/* add log out button */}
					</Box>
				</Toolbar>
			</Box>
		</AppBar>
	);
}
