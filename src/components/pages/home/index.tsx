import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import TabPanel from '@/components/common/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import RawTextTabPanel from './RawTextTabPanel';
import UrlTabPanel from './UrlTabPanel';
import FileTabPanel from './FileTabPanel';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectPostAnalysis } from '@/store/analysis/selectors';
import { Button, Paper } from '@mui/material';
import TableExample from './TableExample';
import { resetPostAnalysisAction } from '@/store/analysis';

export default function Home() {
	// redux hooks
	const dispatch = useAppDispatch();
	const postedAnalysis = useAppSelector(selectPostAnalysis);

	// react hooks
	const [currentTab, setCurrentTab] = useState('0');

	// functions
	const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
		setCurrentTab(newValue);
	};
	const handleResetPost = () => {
		dispatch(resetPostAnalysisAction());
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

			{/* main content - analyze text tabs*/}
			{postedAnalysis.status === 'idle' ? (
				<>
					<Box>
						<Tabs
							value={currentTab}
							onChange={handleChangeTab}
							variant='fullWidth'
							sx={(theme) => ({
								backgroundColor: theme.palette.background.paper,
								borderRadius: '10px',
							})}
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
					</Box>

					{/* content depending on the selected tab */}
					<Box>
						<TabPanel
							value={currentTab}
							index='0'
							ariaId='raw-text'
						>
							<RawTextTabPanel />
						</TabPanel>
						<TabPanel value={currentTab} index='1' ariaId='url'>
							<UrlTabPanel />
						</TabPanel>
						<TabPanel value={currentTab} index='2' ariaId='file'>
							<FileTabPanel />
						</TabPanel>
					</Box>
				</>
			) : (
				<Box>
					<Paper sx={{ p: '1rem' }}>
						<Typography variant='h5'>Resultado</Typography>
						<TableExample scores={postedAnalysis.data.scores} />
						<Button onClick={handleResetPost}>
							Hacer otro analisis
						</Button>
					</Paper>
				</Box>
			)}
		</Stack>
	);
}
