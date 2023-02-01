
import { CommonActionTypes, IProductState, ProductActionTypes } from '../../types/types';


const initialState: IProductState = {
	productOnPage: null,
	categories: null,
	products: null,
	message: '',
	loading: false,
};

export const productReducer = (state = initialState, action: any): IProductState => {
	switch (action.type) {
		case CommonActionTypes.ERROR_MSG: {
			return {
				...state,
				...action.payload
			}
		}
		case ProductActionTypes.GET_PRODUCT_SUCCESS:
			return {
				...state, loading: false, message: action.message, productOnPage: action.payload.product
			};
		

		case ProductActionTypes.GET_PRODUCTS_SUCCESS:
			return {
				...state, loading: false, message: action.message, products: action.payload.products
			};
		case ProductActionTypes.GET_CATEGORIES_SUCCESS:
			return {
				...state, loading: false, message: action.message, categories: action.payload.categories
			};
		default:
			return state;
	}
}