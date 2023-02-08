export function validateUrl(url: string) {
	try {
		const realUrl = new URL(url);
		return true;
	} catch (error) {
		return false;
	}
}
