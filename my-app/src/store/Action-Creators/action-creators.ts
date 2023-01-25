import { act } from 'react-dom/test-utils';
import * as UserActionCreators from './Actions/userActions';
import * as ProductActionCreators from './Actions/productActions';
const actions = {
	...UserActionCreators, ...ProductActionCreators
};
export default actions;