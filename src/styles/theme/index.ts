import { useMediaQuery } from '@mui/material';
import { amber, lime } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Roboto } from '@next/font/google';

import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		lime: PaletteColor;
		mustard: PaletteColor;
	}

	interface PaletteOptions {
		lime?: PaletteColorOptions;
		mustard?: PaletteColorOptions;
	}
}

declare module '@mui/material/LinearProgress' {
	interface LinearProgressPropsColorOverrides {
		lime: true;
		mustard: true;
	}
}

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#FFF500',
		},
		secondary: {
			main: '#fb8c00',
		},
		background: {
			default: '#333333',
			paper: '#5b5b5b',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#FFFFFF',
			disabled: '#969696',
		},
		lime: {
			main: lime['500'],
		},
		mustard: {
			main: amber['500'],
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
		fontSize: 18,
		body1: {
			fontSize: 18,
		},
	},
	shape: {
		borderRadius: 10,
	},
});

export type AppTheme = typeof theme;

export const useAppMediaQuery = useMediaQuery<AppTheme>;

export default theme;
