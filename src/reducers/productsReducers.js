/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
import {
	ADD_PRODUCT,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_ERROR,
	DOWNLOAD_PRODUCTS,
	DOWNLOAD_PRODUCTS_SUCCESS,
	DOWNLOAD_PRODUCTS_ERROR,
	DELETE_PRODUCT,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_ERROR,
	EDIT_PRODUCT,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_ERROR
} from "../types"

// each reducer has your only state
const initialState = {
	products: [],
	error: null,
	loading: false,
	deleteProduct: null, // flag for edit product
	productToEdit: null
}

// the reducer always export a function, the store send the current state and the action to execute, if not send the state, the reducers take initialState
export default function(state = initialState, action) {
	// reducer always be a switch
	switch (action.type) { // the action always has a type
		case ADD_PRODUCT:
		case DOWNLOAD_PRODUCTS:
			return {
				...state, // take a copy of the state
				loading: action.payload
			}
		case ADD_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				products: [...state.products, action.payload]
			}
		case ADD_PRODUCT_ERROR:
		case DOWNLOAD_PRODUCTS_ERROR:
		case EDIT_PRODUCT_ERROR:
		case DELETE_PRODUCT_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case DOWNLOAD_PRODUCTS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				products: action.payload
			}
		case DELETE_PRODUCT:
			return {
				...state,
				deleteProduct: action.payload
			}
		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				products: state.products.filter( p => p.id !== state.deleteProduct), // filtramos eliminando el prod que no queremos
				deleteProduct: null
			}
		case EDIT_PRODUCT:
			return {
				...state,
				productToEdit: action.payload
			}
		case EDIT_PRODUCT_SUCCESS:
			return {
				...state,
				productToEdit: null,
				products: state.products.map( p =>
					p.id === action.payload.id
						? p = action.payload
						: p
				)
			}

		default:
			return state; // the fallback is the state
	}
};