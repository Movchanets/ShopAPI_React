import { IUserState, CommonActionTypes, UserActionTypes } from '../../types/types';



const initialState: IUserState = {
    user: null,
    loading: false,
    isAuth: false,
    message: ''
};

export const userReducer = (state = initialState, action: any): IUserState => {
    switch (action.type) {
        case CommonActionTypes.START_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case UserActionTypes.GOOGLE_LOGIN: {
            return {
                ...state,
                ...action.payload
            }
        }
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: action.payload.decodedToken,
                message: action.payload.message,

            };
        case UserActionTypes.REGISTER_USER:
            return {
                ...state,

                loading: false,
                message: action.payload.message,

            };
        default:
            return state;
    }
}