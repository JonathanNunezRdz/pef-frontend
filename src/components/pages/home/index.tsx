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
import Image from 'next/image';

import RawTextTabPanel from './RawTextTabPanel';
import UrlTabPanel from './UrlTabPanel';
import FileTabPanel from './FileTabPanel';
import AlgorithmScores from './AlgorithmScores';

import Card from '@/components/common/Card';
import { useAddAnalysisMutation } from '@/store/analysis/analysisApi';
import Logo from '../../../../public/static/images/logo/logo_white.png';

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
				<Box display='flex' alignItems='end' gap='1rem'>
					<Box>
						<Image
							src={Logo}
							alt='logo de la aplicacion'
							height={Logo.height * 0.5}
							width={Logo.width * 0.5}
						/>
					</Box>
					<Typography
						variant='subtitle1'
						color={(theme) => theme.palette.text.disabled}
					>
						Analizador de legibilidad de texto en español
						castellano.
					</Typography>
				</Box>
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
						<Typography variant='h6'>Estadisticos</Typography>
						{Object.entries(result.data.metrics).map(
							([key, value]) => {
								return (
									<Box key={key}>
										<Typography>
											{key}: {value}
										</Typography>
									</Box>
								);
							}
						)}
					</Card>
					<Card>
						<Typography variant='h6'>Texto original</Typography>
						<Card paperProps={{ elevation: 3 }}>
							<Typography>{result.originalArgs?.text}</Typography>
						</Card>
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
