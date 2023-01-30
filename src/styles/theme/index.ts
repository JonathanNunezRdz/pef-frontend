import { createTheme } from '@mui/material';
import { Roboto } from '@next/font/google';

// declare module '@mui/material/styles' {
// 	interface Theme {
// 		status: {
// 			danger: string;
// 		};
// 	}
// 	interface ThemeOptions {
// 		status?: {
// 			danger?: string;
// 		};
// 	}
// }

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
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#FFFFFF',
			// hint: 'rgba(255,255,255,0.1)',
			disabled: '#969696',
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
});

export default theme;
