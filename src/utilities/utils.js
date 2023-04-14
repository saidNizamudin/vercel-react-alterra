export function checkExistingUsername(data, username) {
	// check if username already exists. if already exists, return false
	return data.every((e) => e.username !== username);
}

export function getAccount(data, email, password) {
	// return data with the same username
	return data.filter((e) => e.email == email && e.password == password);
}
