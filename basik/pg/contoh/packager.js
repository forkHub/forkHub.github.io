const fs = require('fs').promises;
const path = require('path');

/**
 * Membaca isi file .js dalam direktori dan menyimpannya ke object JSON
 * @param {string} dirPath - Jalur direktori yang ingin dibaca
 * @returns {Promise<Record<string, string>>} Object JSON { [fileName]: fileContent }
 */
async function readJsFilesContent(dirPath) {
	try {
		// 1. Dapatkan daftar nama file .js
		const files = await fs.readdir(dirPath);
		const jsFiles = files.filter(file => path.extname(file).toLowerCase() === '.js');

		const resultObject = [];

		// 2. Baca isi setiap file secara paralel menggunakan Promise.all
		await Promise.all(
			jsFiles.map(async (file) => {
				const filePath = path.join(dirPath, file);
				const content = await fs.readFile(filePath, 'utf-8');
				// resultObject[file] = content;
				resultObject.push({
					namaFile: file,
					data: content
				})

			})
		);

		return resultObject;
	} catch (error) {
		console.error('Gagal membaca isi file:', error.message);
		throw error;
	}
}

async function writePData(name, content) {
	console.log("writePData", name);
	await fs.writeFile("packager/" + name, 'demoData = ' + JSON.stringify(content, null, 2), 'utf-8');
	console.log("writePdata selesai");
}

// Contoh Penggunaan:
(async () => {
	const folderPath = './'; // Ganti dengan folder Anda

	// Dapatkan object JSON berisi isi file
	const filesContentJson = await readJsFilesContent(folderPath);

	console.log('Object JavaScript:', filesContentJson);
	for (item of filesContentJson) {
		// console.log(item);
		await writePData(item.namaFile, item.data);
	}

	// Jika ingin menyimpan object tersebut ke file output.json di disk:
	await fs.writeFile('packager/demo.json', 'demoData = ' + JSON.stringify(filesContentJson, null, 2), 'utf-8');
	console.log('Berhasil menyimpan hasil ke output.json');
})();