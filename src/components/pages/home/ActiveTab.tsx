import Box from '@mui/material/Box';
import TabPanel from '@/components/common/TabPanel';
import RawTextTabPanel from './RawText/RawTextTabPanel';
import UrlTabPanel from './UrlTabPanel';
import FileTabPanel from './FileTabPanel';

interface ActiveTabProps {
	currentTab: string;
}

export default function ActiveTab({ currentTab }: ActiveTabProps) {
	return (
		<Box>
			<TabPanel value={currentTab} index='0' ariaId='raw-text'>
				<RawTextTabPanel />
			</TabPanel>
			<TabPanel value={currentTab} index='1' ariaId='url'>
				<UrlTabPanel />
			</TabPanel>
			<TabPanel value={currentTab} index='2' ariaId='file'>
				<FileTabPanel />
			</TabPanel>
		</Box>
	);
}
