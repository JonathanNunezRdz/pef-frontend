import { GetAnalysisResponse } from '@/types';

export * from './createEmotionCache';
export * from './jwtUtils';
export * from './loadDocument';
export * from './match.decorator';
export * from './parseErrorResponse';
export * from './validateUrl';

export const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4200';

export const MONTH_LABELS = [
	'enero',
	'febrero',
	'marzo',
	'abril',
	'mayo',
	'junio',
	'julio',
	'agosto',
	'septiembre',
	'octubre',
	'noviembre',
	'diciembre',
];

export const mimeTypeRegexp =
	/(application\/pdf|text\/plain|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)/;

export function getPoints(value: number, max: number, inverse = false) {
	let points = (value * 100) / max;
	return inverse ? 100 - points : points;
}

export function getColor(value: number) {
	if (value <= 20) return 'error';
	if (value <= 40) return 'warning';
	if (value <= 60) return 'mustard';
	if (value <= 80) return 'lime';
	return 'success';
}

export function getDarkerColor(color: ReturnType<typeof getColor>) {
	if (color === 'error') return '#7a211b';
	if (color === 'warning') return '#7f5313';
	if (color === 'mustard') return '#7f6003';
	if (color === 'lime') return '#666e1c';
	return '#335d35';
}

export function getScoreLabel(
	score: GetAnalysisResponse['data'][0]['scores'][0]
) {
	if (score.dificulty)
		return `${score.value.toFixed(0)}/${score.algorithm.max} = ${
			score.dificulty
		}`;
	return `${score.value.toFixed(1)} ${score.algorithm.unit}`;
}

export const ALGORITHM_NAMES: Record<
	string,
	{
		forms: { displayFormula: string; explanation?: string }[];
		letterMeanings: { letter: string; meaning: string }[];
	}
> = {
	'Fernández Huerta': {
		forms: [{ displayFormula: 'L = 206.84-0.60*P-1.02*F' }],
		letterMeanings: [
			{
				letter: 'L',
				meaning: 'Lecturabilidad',
			},
			{
				letter: 'P',
				meaning: 'Promedio de sílabas por cada cien palabras',
			},
			{
				letter: 'F',
				meaning: 'Promedio de oraciones por cada cien palabras',
			},
		],
	},

	'Gutiérrez de Polini': {
		forms: [
			{ displayFormula: 'C = 95.2-\\frac{9.7*L}{P}-\\frac{0.35*P}{F}' },
		],
		letterMeanings: [
			{
				letter: 'C',
				meaning: 'Comprensibilidad del texto (Lecturabilidad)',
			},
			{
				letter: 'L',
				meaning: 'Número total de letras',
			},
			{
				letter: 'P',
				meaning: 'Número total de palabras',
			},
			{
				letter: 'F',
				meaning: 'Número total de frases u oraciones',
			},
		],
	},

	'Szigriszt-Pazos': {
		forms: [
			{ displayFormula: 'P = 206.835-\\frac{62.3*S}{Pa}-\\frac{Pa}{F}' },
		],
		letterMeanings: [
			{
				letter: 'P',
				meaning: 'Perspicuidad (legibilidad)',
			},
			{
				letter: 'S',
				meaning: 'Número total de sílabas',
			},
			{
				letter: 'Pa',
				meaning: 'Número total de palabras',
			},
			{
				letter: 'F',
				meaning: 'Número total de frases u oraciones',
			},
		],
	},
	Inflesz: {
		forms: [
			{ displayFormula: 'I = 206.835-\\frac{62.3*S}{P}-\\frac{P}{F}' },
		],

		letterMeanings: [
			{
				letter: 'I',
				meaning: 'Escala INFLESZ',
			},
			{
				letter: 'S',
				meaning: 'Número total de sílabas',
			},
			{
				letter: 'P',
				meaning: 'Número total de palabras',
			},
			{
				letter: 'F',
				meaning: 'Número total de frases u oraciones',
			},
		],
	},

	'Legibilidad μ': {
		forms: [
			{
				displayFormula:
					'\\mu = \\frac{n}{n-1}*\\frac{\\bar{x}}{\\sigma^2}',
			},
		],
		letterMeanings: [
			{
				letter: '\\mu',
				meaning: 'Índice de legibilidad',
			},
			{
				letter: 'n',
				meaning: 'Número total de palabras',
			},
			{
				letter: '\\bar{x}',
				meaning: 'Media del número de letras por palabra',
			},
			{
				letter: '\\sigma^2',
				meaning: 'Varianza del número de letras por palabra',
			},
		],
	},

	Crawford: {
		forms: [{ displayFormula: 'A = -0.205 * OP + 0.049 * SP - 3.407' }],
		letterMeanings: [
			{
				letter: 'A',
				meaning: 'Años de escolarización',
			},
			{
				letter: 'OP',
				meaning: 'Número de oraciones por cada 100 palabras',
			},
			{
				letter: 'SP',
				meaning: 'Número de sílabas por cada 100 palabras',
			},
		],
	},

	UDEM: {
		forms: [
			{
				displayFormula: 'L = (RF*2)+(RG*1)+(RS*2.5)+(RI*3)+(R\\mu*2)',
				explanation: 'Para textos con menos de 100 palabras',
			},
			{
				displayFormula: 'L = (RF*3.5)+(RG*1)+(RS*2)+(RI*2.5)+(R\\mu*1)',
				explanation: 'Para textos con 100 o más palabras',
			},
		],
		letterMeanings: [
			{
				letter: 'L',
				meaning: 'Legibilidad',
			},
			{
				letter: 'RF',
				meaning: 'Resultado del algoritmo de Fernández Huerta',
			},
			{
				letter: 'RG',
				meaning: 'Resultado del algoritmo de Gutiérrez de Polini',
			},
			{
				letter: 'RS',
				meaning: 'Resultado del algoritmo de Szigriszt-Pazos',
			},
			{
				letter: 'RI',
				meaning: 'Resultado del algoritmo de INFLESZ',
			},
			{
				letter: 'R\\mu',
				meaning: 'Resultado del algoritmo μ',
			},
		],
	},
};
