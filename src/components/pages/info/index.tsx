import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress, Stack } from '@mui/material';
import { useGetAlgorithmsQuery } from '@/store/algorithm';
import Card from '@/components/common/Card';
import AlgorithmInfo from './AlgorithmInfo';

interface InfoProps {}

export default function Info({}: InfoProps) {
	// rtk hooks
	const { data, isSuccess, isLoading } = useGetAlgorithmsQuery();

	if (isLoading || !isSuccess)
		return (
			<Stack direction='column' spacing={4}>
				<Card
					paperProps={{
						sx: {
							display: 'flex',
							justifyContent: 'center',
						},
					}}
				>
					<CircularProgress />
				</Card>
			</Stack>
		);

	return (
		<Stack direction='column' spacing={4}>
			<Box mt={1}>
				<Typography variant='h3'>¿Cómo funciona?</Typography>
			</Box>

			<Box display='flex' flexDirection='column' gap={2}>
				<Typography>
					La legibilidad puede ser definida como la facilidad con la
					que se puede leer y comprender un texto, en un sentido más
					amplio es la aptitud de un texto de ser leído fácil y
					cómodamente.
				</Typography>
				<Typography>
					Para poder determinar la legibilidad de un texto es
					necesario aplicar algoritmos de legibilidad para
					posteriormente interpretar los resultados.
				</Typography>
				<Typography component='div'>
					Esta herramienta trabaja específicamente utilizando los
					siguientes algoritmos:
					<ul>
						{data.map((algorithm) => (
							<li key={algorithm.id}>{algorithm.name}</li>
						))}
					</ul>
					Estos algoritmos tienen diferentes parámetros a tomar en
					cuenta y diferente manera de interpretar los resultados.
					Adicionalmente, esta herrmanieta tambien proporciona un
					algoritmo propio, Algoritmo UDEM, que depende de los
					resultados de los algoritmos antes mencionados.
				</Typography>
				<Typography>
					A continuacion se detallan los algoritmos:
				</Typography>
				{data.map((algorithm) => (
					<AlgorithmInfo key={algorithm.id} algorithm={algorithm} />
				))}
			</Box>
		</Stack>
	);
}
