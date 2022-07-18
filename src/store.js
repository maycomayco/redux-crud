import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //use async function with redux

import reducer from "./reducers"; // this import take reducers/index.js automatically

// create the store for the app
const store = createStore(
	reducer,
	compose(applyMiddleware(thunk), // applyMiddleware is only for thunk
	typeof window === 'object' &&
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	),
);

export default store;
