import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import TabPanel from '@/components/common/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import RawTextTabPanel from './RawTextTabPanel';
import { Stack } from '@mui/material';

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function Home() {
	// hooks
	const [value, setValue] = useState('0');

	// functions
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Stack direction='column' spacing='1rem'>
			{/* page title */}
			<Box>
				<Typography variant='h2'>{`<lee>`}</Typography>
				<Typography
					variant='subtitle2'
					color={(theme) => theme.palette.text.disabled}
				>
					Analizador de texto en español castellano.
				</Typography>
			</Box>

			{/* main content - analyze text */}
			<Box>
				<Tabs
					value={value}
					onChange={handleChange}
					variant='fullWidth'
					sx={(theme) => ({
						backgroundColor: theme.palette.background.paper,
						borderRadius: '10px',
					})}
				>
					<Tab
						label='Texto'
						{...a11yProps(0)}
						value={'0'}
						icon={<EditIcon fontSize='small' />}
						iconPosition='start'
					/>
					<Tab
						label='URL'
						{...a11yProps(1)}
						value={'1'}
						icon={<LinkIcon fontSize='small' />}
						iconPosition='start'
					/>
					<Tab
						label='Documento'
						{...a11yProps(2)}
						value={'2'}
						icon={<UploadFileIcon fontSize='small' />}
						iconPosition='start'
					/>
				</Tabs>
			</Box>

			{/* content depending onn the selected tab */}
			<Box>
				<TabPanel value={value} index='0'>
					<RawTextTabPanel />
				</TabPanel>
				<TabPanel value={value} index='1'>
					Introduce un URL
				</TabPanel>
				<TabPanel value={value} index='2'>
					Sube un archivo
				</TabPanel>
			</Box>
		</Stack>
	);
}
