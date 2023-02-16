import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { AllScores } from '@/types';

interface TableExampleProps {
	title?: string;
	scores: AllScores;
}

export default function TableExample({
	title = 'Legibilidad del Texto',
	scores,
}: TableExampleProps) {
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
							{title}
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
						<TableCell align='center'>
							{scores.fHuerta.score}
						</TableCell>
						<TableCell align='center'>
							{scores.fHuerta.difficulty}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>
							Gutiérrez de Polini
						</TableCell>
						<TableCell align='center'>
							{scores.gPolini.score}
						</TableCell>
						<TableCell align='center'>
							{scores.gPolini.difficulty}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>Szigriszt-Pazos</TableCell>
						<TableCell align='center'>
							{scores.sPazos.score}
						</TableCell>
						<TableCell align='center'>
							{scores.sPazos.difficulty}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>Inflesz</TableCell>
						<TableCell align='center'>
							{scores.inflesz.score}
						</TableCell>
						<TableCell align='center'>
							{scores.inflesz.difficulty}
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell align='center'>Legibilidad μ</TableCell>
						<TableCell align='center'>{scores.mu.score}</TableCell>
						<TableCell align='center'>
							{scores.mu.difficulty}
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell align='center'>Crawford</TableCell>
						<TableCell align='center'>
							{scores.crawford.score}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
