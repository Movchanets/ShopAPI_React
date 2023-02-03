import { baseURL } from './../types/types';
import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5034/api/Categories",
	//baseURL: "http://20.163.234.208:4444/api/User",
	headers: {
		"Content-Type": "application/json",
	},

});
const responseBody: any = (response: any) => response.data;
const requests = {
	get: (url: string) => instance.get(url).then().then(responseBody),
	post: (url: string, body?: any) =>
		instance.post(url, body).then().then(responseBody),
	put: (url: string, body?: string) =>
		instance.put(url, body).then().then(responseBody),
	patch: (url: string, body: string) =>
		instance.patch(url, body).then().then(responseBody),
	del: (url: string) => instance.delete(url).then().then(responseBody),
};

const Categories = {

	getCategories: () => requests.get(`/GetAll`),
}

export async function CategoriesGet() {

	const data = await Categories.getCategories()
		.then((response) => {
			return {
				response,
			};
		})
		.catch((error) => {
			return error.response;
		});
	return data;
}
