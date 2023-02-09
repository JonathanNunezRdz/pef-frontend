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
						<TableCell align='center'>{scores.fh.score}</TableCell>
						<TableCell align='center'>
							{scores.fh.difficulty}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>
							Gutiérrez de Polini
						</TableCell>
						<TableCell align='center'>{scores.gp.score}</TableCell>
						<TableCell align='center'>
							{scores.gp.difficulty}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>Szigriszt-Pazos</TableCell>
						<TableCell align='center'>{scores.sp.score}</TableCell>
						<TableCell align='center'>
							{scores.sp.difficulty}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align='center'>Inflesz</TableCell>
						<TableCell align='center'>{scores.i.score}</TableCell>
						<TableCell align='center'>
							{scores.i.difficulty}
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell align='center'>Legibilidad μ</TableCell>
						<TableCell align='center'>{scores.m.score}</TableCell>
						<TableCell align='center'>
							{scores.m.difficulty}
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell align='center'>Crawford</TableCell>
						<TableCell align='center'>{scores.c.score}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
