// import { productReducer } from './Reducers/UserReducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from './Reducers/UserReducer';
import { productReducer } from './Reducers/ProductReducer';
export const rootReducer = combineReducers({
	userReducer, productReducer
});

export const store = createStore(rootReducer,
	composeWithDevTools(applyMiddleware(thunk)));