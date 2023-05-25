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
				</TableBody>
			</Table>
		</TableContainer>
	);
}
