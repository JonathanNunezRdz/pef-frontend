import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import ScoreBar from '@/components/common/ScoreBar';

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function Home() {
	const [value, setValue] = useState('0');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<>
			<Box
				sx={{
					mt: 4,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Tabs value={value} onChange={handleChange} variant='fullWidth'>
					<Tab label='Texto' {...a11yProps(0)} value={'0'} />
					<Tab label='URL' {...a11yProps(1)} value={'1'} />
					<Tab label='Documento' {...a11yProps(2)} value={'2'} />
				</Tabs>
			</Box>

			{/* content depending onn the selected tab */}
		</>
	);
}
