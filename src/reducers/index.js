import { combineReducers } from "redux"; //whit this we can use multiple reducers and combine in only one

// we declared all reducers here
import productsReducers from "./productsReducers";
import alertReducer from "./alertReducer";

export default combineReducers({
	products: productsReducers,
	alert: alertReducer
})