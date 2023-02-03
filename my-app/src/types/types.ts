export const baseURL = "http://localhost:5034/images/";
export interface IAuthProvider {
    provider: string,
    token: any
}
export interface ISearch {
    pageNumber: number,
    pageSize: number,
    Category: string,
    Find: string | null,
}
export interface IUser {
    name: string,
    surname: string,
    username: string,
    email: string
}
export interface ILogin {
    email: string,
    password: string
}
export interface IRegister {
    email: string | undefined
    UserName: string | undefined
    FirstName: string | undefined
    LastName: string | undefined
    password: string | undefined
    CheckPassword: string | undefined
}
export interface IUserState {
    user: IUser | null,
    loading: boolean,
    isAuth: boolean,
    message: ''
}
export interface IProduct {
    name: string
    price: number
    manufacturer: string
    description: string
    shortDescription: string
    image: string
    category: string
    hTMLbody: string
}
export interface IProductState {
    productOnPage: IProduct | null
    products: Array<IProduct>
    categories: Array<string>
    message: string | null,
    loading: boolean,
}
export enum CommonActionTypes {
    START_REQUEST = "START_REQUEST",
    ERROR_MSG = "ERROR_MSG",
    SERVER_USER_ERROR = "SERVER_USER_ERROR",

}
export enum ProductActionTypes {
    GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS",
    GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
    GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",

}
interface GetProductActionSuccess {
    type: ProductActionTypes.GET_PRODUCT_SUCCESS,
    message: any,
    product: any

}
interface GetProductsActionSuccess {
    type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
    message: any,
    products: IProduct[]

}
interface GetCategoriesActionSuccess {
    type: ProductActionTypes.GET_CATEGORIES_SUCCESS,
    message: any,
    categories: []

}
export enum UserActionTypes {

    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    GOOGLE_LOGIN = "GOOGLE_LOGIN",
    REGISTER_USER = "REGISTER_USER"
}
interface LoginUserSuccessAction {
    type: UserActionTypes.LOGIN_USER_SUCCESS
    payload: any
}
interface RegisterUserSuccess {
    type: UserActionTypes.REGISTER_USER
    payload: any
}
interface StartRequest {
    type: CommonActionTypes.START_REQUEST,
    payload: any
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
export type CommonActions = Error_MSG
    | ServerUserErrorAction
    | GoogleExternalLogin
    | StartRequest
    | ServerUserErrorAction
export type ProductActions = GetProductActionSuccess
    | GetCategoriesActionSuccess
    | GetProductsActionSuccess
    | GetProductActionSuccess;
export type UserActions = LoginUserSuccessAction | RegisterUserSuccess;


