import {
	AppBar,
	Box,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import Menu from '@mui/material/Menu';

// TODO: continue with appbar example on mui

export default function Header() {
	// add all logic
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h1'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '0.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
					>
						<IconButton
							size='large'
							aria-label='account of current user'
							arai-controls='menu-appbar'
							aria-haspopup='true'
							// onClick={}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						{/* add menu */}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
