const storage = {
	get: (key, _default) => {
		try {
			const data = JSON.parse(localStorage.getItem(key));
			if (data === null) {
				return _default || undefined;
			}
			return data;
		} catch (error) {
			return _default || undefined;
		}
	},
	set: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
		return localStorage.getItem(key);
	},
	remove: (key) => {
		localStorage.removeItem(key);
	},
};

export default storage;
