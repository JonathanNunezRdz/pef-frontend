import Box from '@mui/material/Box';

interface TabPanelProps {
	children?: React.ReactNode;
	index: string;
	value: string;
	ariaId: string;
}

export default function TabPanel(props: TabPanelProps) {
	const { ariaId, children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabpanel-${ariaId}`}
			aria-labelledby={`tab-${ariaId}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}
