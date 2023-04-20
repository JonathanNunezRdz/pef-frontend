export function loadDocument(files: FileList | null) {
	return new Promise<{ document: File }>((resolve, reject) => {
		if (files && files[0]) {
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target) {
					const format = files[0].type;
					if (!/(application\/pdf|text\/plain)/.test(format)) return;
					resolve({
						document: files[0],
					});
				}
			};
			reader.readAsDataURL(files[0]);
		}
	});
}
