import { CommonActionTypes } from './../../types/types';
import { IUserState, UserActionTypes } from '../../types/types';


const initialState: IUserState = {
    UserName: '',
    Email: '',
    FirstName: '',
    LastName: ''
};

export const userReducer = (state = initialState, action: any): IUserState => {
    switch (action.type) {
        case CommonActionTypes.ERROR_MSG: {
            return {
                ...state,
                ...action.payload
            }
        }
        case UserActionTypes.GOOGLE_LOGIN: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}