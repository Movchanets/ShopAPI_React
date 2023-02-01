

import { Dispatch } from "redux";
import { GoogleExternalLoginAsync, login, Register } from '../../../axios/UserController';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { CommonActions, UserActions, CommonActionTypes, UserActionTypes, IUser } from '../../../types/types';



export const RegisterUser = (user: any) => {
	return async (dispatch: Dispatch<CommonActions | UserActions>) => {
		try {
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await Register(user);
			const { response } = data;
			console.log(data);


			dispatch({ type: UserActionTypes.REGISTER_USER, payload: { response: response.message } });
			toast.success("Successful Registration ");
		}
		catch (e) {
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: 'Виникла помилка',
			});
		}
	};
};
export const LoginUser = (user: any) => {
	return async (dispatch: Dispatch<CommonActions | UserActions>) => {
		try {
			dispatch({ type: CommonActionTypes.START_REQUEST, payload: "Loading" });
			const data = await login(user);
			const { response } = data;

			dispatch({
				type: CommonActionTypes.ERROR_MSG,
				payload: data.response.message,
			});

			const { token } = data.response;
			const decodedToken = LogUser(token);
			console.log(decodedToken);
			dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: { decodedToken: decodedToken, message: "Login" } });
			toast.success("Successful login ");

		} catch (e) {
			toast.error("Login failure");
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: "Unknown error",
			});
		}
	};
};
export const GoogleLogin = (gtoken: any, Provider: string) => {
	return async (dispatch: Dispatch<CommonActions | UserActions>) => {

		try {

			const data = await GoogleExternalLoginAsync(gtoken, Provider);
			const tkn = data.token;
			const decodedToken = LogUser(tkn);
			console.log(decodedToken);
			dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: { decodedToken: decodedToken, message: "Login" } });
			toast.success("Google login ");
		} catch (e) {
			toast.error("Google login failed");
			dispatch({
				type: CommonActionTypes.SERVER_USER_ERROR,
				payload: "Unknown error",
			});
		}
	};
}
const LogUser = (token: string) => {
	const decodedToken = jwtDecode(token) as IUser;
	return decodedToken;


}