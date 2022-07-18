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
	EDIT_PRODUCT_START,
	EDIT_PRODUCT_SUCCESS,
	EDIT_PRODUCT_ERROR
} from "../types"
import axiosClient from "../config/axios"
import Swal from "sweetalert2";

/*
create new products, from here we insert in the DB and execute the reducers to modify the state
This function is called from the component (view)
*/

export function createNewProductAction(product) {
	// dispatch always execute actions (functions)
	return async (dispatch) => {
		dispatch( addProduct() );

		// handle DB
		try {
			// insert in the API
			await axiosClient.post('/products', product);

			// if it's ok update the state
			dispatch( addProductSuccess(product) )

			// alert swal
			Swal.fire(
				'OK',
				'The product was added',
				'success'
			)
		} catch (error) {
			console.log(error);
			// update the state
			dispatch( addProductError(true) )

			// alert swal
			Swal.fire(
				'ERROR',
				'Has been an error',
				'error'
			)
		}
	}
}

// this functions also in the reducer, type: is for the describe the app, payload: is for the data
const addProduct = () => ({
	type: ADD_PRODUCT,
	payload: true
})

// if DB is the OK, we send the payload
const addProductSuccess = product => ({
	type: ADD_PRODUCT_SUCCESS,
	payload: product
})

// catch case
const addProductError = status => ({
	type: ADD_PRODUCT_ERROR,
	payload: status
})

// get products from DB
export function getProductsAction(){
	return async (dispatch) => {
		dispatch( downloadProducts() );

		try {
			const response = await axiosClient('/products');
			dispatch( downloadProductsSuccess(response.data) );
		} catch (error) {
			dispatch( downloadProductsError() );
		}
	}
}

const downloadProducts = () => ({
	type: DOWNLOAD_PRODUCTS,
	payload: true
})

const downloadProductsSuccess = products => ({
	type: DOWNLOAD_PRODUCTS_SUCCESS,
	payload: products
})

const downloadProductsError = () => ({
	type: DOWNLOAD_PRODUCTS_ERROR,
	payload: true
})

// select and delete product
export function deleteProductAction(id) {
	return async (dispatch) => {
		dispatch(deleteProduct(id));

		// delete product from DB
		try {
			await axiosClient.delete(`/products/${id}`);
			dispatch( deleteProductSuccess());

			// show alert
			Swal.fire(
				'Deleted!',
				'Your product has been deleted.',
				'success'
			)
		} catch (error) {
			console.log(error);
			dispatch( deleteProductError() )
		}
	}
}
// cuando el user seleccione un prod, obetenemos el id
const deleteProduct = id => ({
	type: DELETE_PRODUCT,
	payload: id
})

const deleteProductSuccess = () => ({
	type: DELETE_PRODUCT_SUCCESS
})

const deleteProductError = () => ({
	type: DELETE_PRODUCT_ERROR,
	payload: true
})

// put the product in the state for edit
export function editProductAction(product) {
	return (dispatch) => {
		dispatch( editProduct(product) );
	}
}

const editProduct = product => ({
	type: EDIT_PRODUCT,
	payload:product
})

// edit product in the DB
export function editProductDBAction(product) {
	return async (dispatch) => {
		dispatch(editProductStart());

		try {
			await axiosClient.put(`/products/${product.id}`, product);
			// if OK the edit, we modify the store
			dispatch( editProductSuccess(product) );
		} catch (error) {
			console.log(error);
			dispatch( editProductError() );
		}
	}
}

// only for describe what we doing
const editProductStart = () => ({
	type: EDIT_PRODUCT_START
});

const editProductSuccess = product => ({
	type: EDIT_PRODUCT_SUCCESS,
	payload: product
});

const editProductError = () => ({
	type: EDIT_PRODUCT_ERROR,
	payload: true
})

