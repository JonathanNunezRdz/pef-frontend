import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
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
import {
	useAddAnalysisMutation,
	useAddAnalysisWithFileMutation,
} from '@/store/analysis/analysisApi';
import Logo from '../../../../public/static/images/logo/logo_white.png';
import { AnalysisResponse } from '@/types';

export default function Home() {
	// redux hooks
	const [postAnalysis, postAnalysisResult] = useAddAnalysisMutation({});
	const [postAnalysisWithFile, postAnalysisWithFileResult] =
		useAddAnalysisWithFileMutation({});

	// react hooks
	const [currentTab, setCurrentTab] = useState('0');
	const [currentResult, setCurrentResult] =
		useState<AnalysisResponse | null>();
	const [showTabs, setShowTabs] = useState<boolean>(false);

	useEffect(() => {
		if (postAnalysisResult.isSuccess) {
			setCurrentResult(postAnalysisResult.data);
		} else if (postAnalysisWithFileResult.isSuccess) {
			setCurrentResult(postAnalysisWithFileResult.data);
		}
	}, [postAnalysisResult, postAnalysisWithFileResult]);
	useEffect(() => {
		if (
			postAnalysisResult.isUninitialized &&
			postAnalysisWithFileResult.isUninitialized
		) {
			setShowTabs(true);
		}
		if (
			postAnalysisResult.isLoading ||
			postAnalysisWithFileResult.isLoading
		) {
			setShowTabs(false);
		}
	}, [postAnalysisResult, postAnalysisWithFileResult]);

	// functions
	const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
		setCurrentTab(newValue);
	};
	const handleResetPost = () => {
		postAnalysisResult.reset();
		postAnalysisWithFileResult.reset();
		setCurrentResult(null);
		setShowTabs(true);
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
			{showTabs && (
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
							<FileTabPanel
								postAnalysisWithFile={postAnalysisWithFile}
							/>
						</TabPanel>
					</Box>
				</>
			)}
			{postAnalysisResult.isLoading ||
				(postAnalysisWithFileResult.isLoading && (
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
				))}
			{currentResult && (
				<>
					<Card>
						<Typography variant='h5'>Resultados</Typography>
					</Card>
					<Card>
						<AlgorithmScores scores={currentResult.scores} />
					</Card>
					<Card>
						<Typography variant='h6'>Estadisticos</Typography>
						{Object.entries(currentResult.metrics).map(
							([key, value]) => {
								return (
									<Box key={key}>
										<Typography>
											{key}: {value.toFixed(2)}
										</Typography>
									</Box>
								);
							}
						)}
					</Card>
					{/* <Card>
						<Typography variant='h6'>Texto original</Typography>
						<Card paperProps={{ elevation: 3 }}>
							<Typography>
								{postAnalysisResult.originalArgs?.text}
							</Typography>
						</Card>
					</Card> */}
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
			{postAnalysisResult.isError && (
				<>
					<Card>
						<Typography variant='h5'>Error!</Typography>
					</Card>
					<Card>
						<Typography>
							{'status' in postAnalysisResult.error
								? JSON.stringify(postAnalysisResult.error.data)
								: JSON.stringify(postAnalysisResult.error)}
						</Typography>
					</Card>
				</>
			)}
		</Stack>
	);
}
