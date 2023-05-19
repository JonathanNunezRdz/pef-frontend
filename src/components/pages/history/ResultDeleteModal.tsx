import { useDeleteResultMutation } from '@/store/result';
import { Box, Button, Modal, Typography } from '@mui/material';

interface ResultDeleteModalProps {
	isOpen: boolean;
	handleClose: () => void;
	resultId: string;
	title: string;
}

export default function ResultDeleteModal({
	isOpen,
	handleClose,
	resultId,
	title,
}: ResultDeleteModalProps) {
	// rtk hooks
	const [deleteResult] = useDeleteResultMutation();

	const handleDelete = () => {
		deleteResult({ resultId });
	};

	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
			aria-labelledby='Eliminar resultado'
			aria-describedby={`Eliminar resultado con nombre ${title}`}
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					pt: 3,
					px: 4,
					pb: 4,
					borderRadius: '10px',
				}}
			>
				<Typography id='Eliminar resultado' variant='h6'>
					¿Eliminar resultado?
				</Typography>
				<Typography
					id={`Eliminar resultado con nombre ${title}`}
					mt={2}
				>
					¿Estás seguro de que quieres eliminar el resultado:{' '}
					<Typography fontStyle='italic' component='span'>
						{title}
					</Typography>{' '}
					?
				</Typography>
				<Box display='flex' mt={2} gap={2}>
					<Button variant='contained' onClick={handleClose}>
						Cancelar
					</Button>
					<Button
						variant='contained'
						onClick={handleDelete}
						color='error'
					>
						Eliminar
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
