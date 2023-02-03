import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import TabPanel from '@/components/common/TabPanel';

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
		<Box>
			<Box>
				{/* page title */}
				<Box>
					<Typography variant='h2'>{`<lee>`}</Typography>
				</Box>
				<Tabs value={value} onChange={handleChange} variant='fullWidth'>
					<Tab label='Texto' {...a11yProps(0)} value={'0'} />
					<Tab label='URL' {...a11yProps(1)} value={'1'} />
					<Tab label='Documento' {...a11yProps(2)} value={'2'} />
				</Tabs>
			</Box>

			{/* content depending onn the selected tab */}
			<Box>
				<TabPanel value={value} index='0'>
					Introduce tu texto
				</TabPanel>
				<TabPanel value={value} index='1'>
					Introduce un URL
				</TabPanel>
				<TabPanel value={value} index='2'>
					Sube un archivo
				</TabPanel>
			</Box>
		</Box>
	);
}
