import { AlgorithmWithScale } from '@/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface InterpretationTableProps {
	scales: Required<AlgorithmWithScale>['scales'];
}

export default function InterpretationTable({
	scales,
}: InterpretationTableProps) {
	const getHeaderLabels = () => {
		if (scales[0].extra !== null)
			return Object.entries(scales[0].extra).map(
				([_, { label }]) => label
			);

		return [];
	};
	return (
		<TableContainer component={Paper} sx={{ mt: 2 }}>
			<Table aria-label='tabla de interpretación'>
				<TableHead>
					<TableRow>
						<TableCell>Rango</TableCell>
						<TableCell>Dificultad</TableCell>
						{getHeaderLabels().map((label) => (
							<TableCell key={label}>{label}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{scales.map((scale, i, arr) => {
						const lowerLimit =
							i === 0 ? 0 : arr[i - 1].upperLimit + 1;
						const getExtraLabels = () => {
							if (scale.extra !== null)
								return Object.entries(scale.extra).map(
									([_, { value }]) => value
								);
							return [];
						};
						return (
							<TableRow key={scale.id}>
								<TableCell>
									{lowerLimit} a {scale.upperLimit}
								</TableCell>
								<TableCell>{scale.level}</TableCell>
								{getExtraLabels().map((label) => (
									<TableCell key={label}>{label}</TableCell>
								))}
							</TableRow>
						);
					})}
					{/* <TableRow>
						<TableCell>0 a 30</TableCell>
						<TableCell>Muy difícil</TableCell>
						<TableCell>Universitario (especialización)</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>31 a 50</TableCell>
						<TableCell>Difícil</TableCell>
						<TableCell>Cursos selectivos</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>51 a 60</TableCell>
						<TableCell>Moderadamente difícil</TableCell>
						<TableCell>Preuniversitario</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>61 a 70</TableCell>
						<TableCell>Normal</TableCell>
						<TableCell>7° u 8° grado</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>71 a 80</TableCell>
						<TableCell>Normal</TableCell>
						<TableCell>7° u 8° grado</TableCell>
					</TableRow> */}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
