import { IProductState, CommonActionTypes } from './../../types/types';



const initialState: IProductState = {
	Name: '',
	Price: 0

};

export const productReducer = (state = initialState, action: any): IProductState => {
	switch (action.type) {
		case CommonActionTypes.ERROR_MSG: {
			return {
				...state,
				...action.payload
			}
		}

		default:
			return state;
	}
}