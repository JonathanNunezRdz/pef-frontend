import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface TabPanelProps {
	children?: React.ReactNode;
	index: string;
	value: string;
}

export default function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Paper sx={{ p: '1rem' }}>
					<Typography>{children}</Typography>
				</Paper>
			)}
		</div>
	);
}
