export function convertCurrency(amount, fromCurrency, toCurrency) {
	return fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return amount * data.rates[toCurrency];
		});
}
