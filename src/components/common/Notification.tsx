import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';
import { useState } from 'react';

interface NotificationProps {
	onClose?: () => void;
	type: AlertProps['severity'];
	autoHideDuration?: SnackbarProps['autoHideDuration'];
	message?: string;
	open: boolean;
}

export default function Notification({
	type,
	onClose,
	autoHideDuration,
	open,
	message,
}: NotificationProps) {
	const [show, setShow] = useState(open);
	const handleClose = () => {
		if (onClose) {
			onClose();
		} else {
			setShow(false);
		}
	};
	return (
		<Snackbar
			open={onClose ? open : show}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			autoHideDuration={autoHideDuration}
		>
			<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
}
