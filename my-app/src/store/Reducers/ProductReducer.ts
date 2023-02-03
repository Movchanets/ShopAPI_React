
import { CommonActionTypes, IProductState, ProductActionTypes } from '../../types/types';


const initialState: IProductState = {
	productOnPage: null,
	categories: [],
	products: [],
	message: null,
	loading: false,
};

export const productReducer = (state = initialState, action: any): IProductState => {
	switch (action.type) {
		case ProductActionTypes.GET_PRODUCT_SUCCESS:
			return {
				...state, loading: false, message: action.message, productOnPage: action.product
			};


		case ProductActionTypes.GET_PRODUCTS_SUCCESS:
			return {
				...state, loading: false, message: action.message, products: action.products
			};
		case ProductActionTypes.GET_CATEGORIES_SUCCESS:
			return {
				...state, loading: false, message: action.message, categories: action.categories
			};
		default:
			return state;
	}
}