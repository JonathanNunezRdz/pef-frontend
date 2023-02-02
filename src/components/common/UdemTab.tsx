import Tab, { TabProps } from '@mui/material/Tab';

interface UdemTabProps extends TabProps {
	label: string;
	value: string;
	activeValue: string;
}

export default function UdemTab(props: UdemTabProps) {
	const { activeValue, value, ...rest } = props;
	const active = activeValue === value;

	return (
		<Tab
			{...rest}
			value={value}
			sx={(theme) => ({
				backgroundColor: active
					? theme.palette.grey[700]
					: theme.palette.grey[800],
			})}
		/>
	);
}
