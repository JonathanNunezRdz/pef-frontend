import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { MouseEvent, useState } from 'react';

import { useAppMediaQuery } from '@/styles/theme';
import Link, { NextLinkComposed } from '../common/Link';
import Logo from '../common/Logo';
import { useRouter } from 'next/router';

// TODO: continue with appbar example on mui

type Page = {
	route: string;
	label: string;
};

const links: Page[] = [
	{ route: '/', label: 'Analizar' },
	{ route: '/como_funciona', label: '¿Cómo funciona?' },
];

export default function Header() {
	// hooks
	const router = useRouter();
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const showOnMobile = useAppMediaQuery((theme) =>
		theme.breakpoints.down('sm')
	);

	// functions
	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
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
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{/* only show when not on mobile */}
					<Link href='/'>
						<Logo
							sx={{
								mr: 2,
								ml: -1,
								display: flexOnMobile(true),
							}}
						/>
					</Link>

					{/* only show when on mobile */}
					<Box
						display={flexOnMobile()}
						sx={{
							flexGrow: 1,
						}}
					>
						<IconButton
							size='large'
							aria-label='account of current user'
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
							{links.map((link) => (
								<MenuItem
									key={link.route}
									onClick={handleCloseNavMenu}
									component={NextLinkComposed}
									to={link.route}
									selected={isActiveLink(link.route)}
								>
									{link.label}
								</MenuItem>
							))}
						</Menu>
					</Box>

					{/* only show when on mobile */}
					<Box
						sx={{
							mt: 1,
							mr: 2,
							flexGrow: 1,
							display: flexOnMobile(),
						}}
					>
						<Link href='/'>
							<Logo />
						</Link>
					</Box>

					{/* only show when not on mobile */}
					<Box
						sx={{
							flexGrow: 1,
							display: flexOnMobile(true),
						}}
					>
						{/* map through links/pages */}
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
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									alt='User name'
									src='/static/images/avatar/2.jpg'
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{/* map through user menu items */}
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign='center'>
									Account
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
