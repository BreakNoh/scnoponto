import { openDB } from 'idb';

export const DB = openDB('scnoponto', 3, {
	upgrade: (db) => {
		if (!db.objectStoreNames.contains('favoritos')) {
			const store = db.createObjectStore('favoritos', { keyPath: 'slug' });
		}
	}
});
