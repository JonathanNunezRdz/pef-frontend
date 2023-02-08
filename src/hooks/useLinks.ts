import { Page } from '@/components/layout/Header';
/**
 * historial
 * mi cuenta
 * cerrar sesion
 */
const loggedInLinks: Page[] = [
	{ route: '/historial', label: 'Historial' },
	{ route: '/mi_cuenta', label: 'Mi cuenta' },
	{ route: '/', label: 'Cerrar sesión' },
];

/**
 * iniciar sesion
 * crear una cuenta
 */
const loggedOutLinks: Page[] = [
	{ route: '/iniciar_sesion', label: 'Iniciar sesión' },
	{ route: '/crear_cuenta', label: 'Crear cuenta' },
];

export function useLinks(loggedIn: boolean) {
	if (loggedIn) return loggedInLinks;
	return loggedOutLinks;
}
