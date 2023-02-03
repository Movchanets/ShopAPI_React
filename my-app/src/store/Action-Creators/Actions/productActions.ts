import { toast } from 'react-toastify';
import { ProductActions, CommonActions, CommonActionTypes, ProductActionTypes, ISearch, IProduct } from './../../../types/types';

import { Dispatch } from "redux";
import { GetProducts, ProductGet } from '../../../axios/ProductController';
import { CategoriesGet } from '../../../axios/CategoryController';


export const Categories = () => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			console.log("Here Categories")
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await CategoriesGet();
			const { response } = data;
			console.log(response)
			if (!response.isSuccess) {
				dispatch({
					type: CommonActionTypes.ERROR_MSG,
					payload: response.message,
				});
			}
			dispatch({
				type: ProductActionTypes.GET_CATEGORIES_SUCCESS,
				message: response.message,
				categories: response.payload
			});

		}
		catch (e) {
			console.log(e)
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
};
export const Products = (search: ISearch) => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			console.log("Here Products")
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await GetProducts(search);
			const { response } = data;
			console.log(response)
			const prods: Array<IProduct> = response.payload;

			if (!response.isSuccess) {
				dispatch({
					type: CommonActionTypes.ERROR_MSG,
					payload: response.message,
				});
			}
			dispatch({
				type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
				message: response.message,
				products: prods

			});
		}
		catch (e) {
			console.log(e)
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
};
export const Product = (title: string) => {
	return async (dispatch: Dispatch<CommonActions | ProductActions>) => {
		try {
			console.log("here prod")
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await ProductGet(title);
			const { response } = data;
			console.log(data)
			if (!response.isSuccess) {
				dispatch({
					type: CommonActionTypes.ERROR_MSG,
					payload: response.message,
				});
			}
			dispatch({
				type: ProductActionTypes.GET_PRODUCT_SUCCESS,
				message: data.response.message,
				product: data.response.payload

			});
		}
		catch (e) {
			console.log(e)
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
};
