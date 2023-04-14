import AxiosInstances from 'axios';

const PRODUCT_PREFIX = '/products';
const axios = AxiosInstances.create({
	baseURL: 'https://6425f56c556bad2a5b471ad4.mockapi.io/saidNizamudin/',
});
export default axios;

export function getProductList() {
	return axios({
		method: 'get',
		url: `${PRODUCT_PREFIX}`,
	});
}

export function getProductById(id) {
	return axios({
		method: 'get',
		url: `${PRODUCT_PREFIX}/${id}`,
	});
}

export function createProduct(data) {
	return axios({
		method: 'post',
		url: `${PRODUCT_PREFIX}`,
		data: data,
	});
}

export function updateProduct(id, data) {
	return axios({
		method: 'put',
		url: `${PRODUCT_PREFIX}/${id}`,
		data: data,
	});
}

export function deleteProduct(id) {
	return axios({
		method: 'delete',
		url: `${PRODUCT_PREFIX}/${id}`,
	});
}
