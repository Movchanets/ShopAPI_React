export interface IAuthProvider {
    provider: string,
    token: any
}
export interface IUserState {
    UserName: string,
    Email: string,
    FirstName: string,
    LastName: string
}
export interface IProductState {
    Name: string,
    Price: number,

}
export enum CommonActionTypes {

    ERROR_MSG = "ERROR_MSG",
    SERVER_USER_ERROR = "SERVER_USER_ERROR",

}
export enum ProductActionTypes {


}
export enum UserActionTypes {

    GOOGLE_LOGIN = "GOOGLE_LOGIN"
}

interface Error_MSG {
    type: CommonActionTypes.ERROR_MSG,
    payload: any
}
interface GoogleExternalLogin {
    type: UserActionTypes.GOOGLE_LOGIN,
    payload: any
}

interface ServerUserErrorAction {
    type: CommonActionTypes.SERVER_USER_ERROR,
    payload: any
}
export interface IAuthProvider {
    provider: string;
    token: any;
}
export type UserActions = Error_MSG
    | ServerUserErrorAction
    | GoogleExternalLogin;
export type ProductActions = Error_MSG
    | ServerUserErrorAction;


