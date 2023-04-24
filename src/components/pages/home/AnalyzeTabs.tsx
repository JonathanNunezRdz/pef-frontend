import { Box, Paper, Tab, Tabs } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Fragment, useState } from 'react';
import ActiveTab from './ActiveTab';

interface AnalyzeTabsProps {}

export default function AnalyzeTabs({}: AnalyzeTabsProps) {
	const [currentTab, setCurrentTab] = useState('0');
	const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
		setCurrentTab(newValue);
	};
	return (
		<Fragment>
			<Box>
				<Paper>
					<Tabs
						value={currentTab}
						onChange={handleChangeTab}
						variant='fullWidth'
						sx={{
							borderRadius: '10px',
						}}
					>
						<Tab
							id='tab-raw-text'
							aria-controls='tabpanel-raw-text'
							label='Texto'
							value={'0'}
							icon={<EditIcon fontSize='small' />}
							iconPosition='start'
						/>
						<Tab
							id='tab-url'
							aria-controls='tabpanel-url'
							label='URL'
							value={'1'}
							icon={<LinkIcon fontSize='small' />}
							iconPosition='start'
						/>
						<Tab
							id='tab-file'
							aria-controls='tabpanel-file'
							label='Documento'
							value={'2'}
							icon={<UploadFileIcon fontSize='small' />}
							iconPosition='start'
						/>
					</Tabs>
				</Paper>
			</Box>
			<ActiveTab currentTab={currentTab} />
		</Fragment>
	);
}
