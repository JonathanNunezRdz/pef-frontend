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
import { Button, CircularProgress, Paper } from '@mui/material';

import RawTextTabPanel from './RawTextTabPanel';
import UrlTabPanel from './UrlTabPanel';
import FileTabPanel from './FileTabPanel';
import AlgorithmScores from './AlgorithmScores';

import Card from '@/components/common/Card';
import { useAddAnalysisMutation } from '@/store/analysis/analysisApi';

export default function Home() {
	// redux hooks
	const [postAnalysis, result] = useAddAnalysisMutation({});

	// react hooks
	const [currentTab, setCurrentTab] = useState('0');

	// functions
	const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
		setCurrentTab(newValue);
	};
	const handleResetPost = () => {
		result.reset();
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
			{result.isUninitialized && (
				<>
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

					{/* content depending on the selected tab */}
					<Box>
						<TabPanel
							value={currentTab}
							index='0'
							ariaId='raw-text'
						>
							<RawTextTabPanel postAnalysis={postAnalysis} />
						</TabPanel>
						<TabPanel value={currentTab} index='1' ariaId='url'>
							<UrlTabPanel />
						</TabPanel>
						<TabPanel value={currentTab} index='2' ariaId='file'>
							<FileTabPanel />
						</TabPanel>
					</Box>
				</>
			)}
			{result.isLoading && (
				<Card
					paperProps={{
						sx: {
							display: 'flex',
							justifyContent: 'center',
						},
					}}
				>
					<CircularProgress />
				</Card>
			)}
			{result.isSuccess && (
				<>
					<Card>
						<Typography variant='h5'>Resultados</Typography>
					</Card>
					<Card>
						<AlgorithmScores scores={result.data.scores} />
					</Card>
					<Card>
						<Typography variant='h6'>Texto original</Typography>
						<Typography>{result.originalArgs?.text}</Typography>
					</Card>
					<Card
						paperProps={{
							sx: {
								flexDirection: 'row-reverse',
								display: 'flex',
							},
						}}
					>
						<Button
							onClick={handleResetPost}
							variant='contained'
							color='secondary'
						>
							Hacer otro analisis
						</Button>
					</Card>
				</>
			)}
		</Stack>
	);
}
