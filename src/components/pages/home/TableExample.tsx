import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

interface TableExampleProps {
	title: string;
}

export default function TableExample({ title }: TableExampleProps) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='legibilidad del texto'>
				<TableHead
					sx={(theme) => ({
						backgroundColor: theme.palette.grey[800],
					})}
				>
					<TableRow>
						<TableCell align='center' colSpan={3}>
							Legibilidad del Texto
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>Formula</TableCell>
						<TableCell align='center'>Valor</TableCell>
						<TableCell align='center'>Dificultad</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell align='center'>Fernandez Huerta</TableCell>
						<TableCell align='center'>83.78</TableCell>
						<TableCell align='center'>Fácil</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>
							Gutiérrez de Polini
						</TableCell>
						<TableCell align='center'>52.12</TableCell>
						<TableCell align='center'>Normal</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>Szigriszt-Pazos</TableCell>
						<TableCell align='center'>79.24</TableCell>
						<TableCell align='center'>Fácil</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>Inflesz</TableCell>
						<TableCell align='center'>79.24</TableCell>
						<TableCell align='center'>Bastante Fácil</TableCell>
					</TableRow>

					<TableRow>
						<TableCell align='center'>Legibilidad μ</TableCell>
						<TableCell align='center'>83.78</TableCell>
						<TableCell align='center'>Fácil</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
