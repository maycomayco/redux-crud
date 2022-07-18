import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// useSelector, nos permite acceder al state dentro del component
import { useNavigate } from 'react-router-dom';

// Redux actions
import { createNewProductAction } from "../actions/productActions";
import { showAlertAction, hideAlertAction } from "../actions/alertActions";

// history is a parameter from react-router-dom
const NewProduct = ({ history }) => {
	const navigate = useNavigate();

	// local state
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);

	// useDispatch, manda a ejecutar las acciones que tengamos, retorna una function
	const dispatch = useDispatch(); // lo utilizamos para ejecutar las funciones de los actions

	// Get state from store.js
	const loading = useSelector(state => state.products.loading);
	const error = useSelector(state => state.products.error);
	const alert = useSelector(state => state.alert.alert);

	// llamamos el action
	const addProduct = product => dispatch( createNewProductAction(product) );

	const handleSubmit = e => {
		e.preventDefault();

		// validate form
		if (name.trim() === '' || price <= 0) {

			// create response for alert
			const alertResponse = {
				msg: 'Both fields are required',
				classes: 'alert alert-danger text-center text-uppercase p3'
			};
			dispatch( showAlertAction(alertResponse) );

			return;
		}

		// if not has errors
		dispatch( hideAlertAction() );

		// create product
		addProduct({
			name,
			price
		});

		// redirect to list
		navigate('/');
	}

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">Add product</h2>

						{ alert && <p className={alert.classes}>{alert.msg}</p> }

						<form
							onSubmit={handleSubmit}
						>
							<div className="form-group">
								<label>Product name</label>
								<input
									type="text"
									className="form-control"
									placeholder="Product name"
									name="name"
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</div>

							<div className="form-group">
								<label>Product price</label>
								<input
									type="number"
									className="form-control"
									placeholder="Product price"
									name="price"
									value={price}
									onChange={e => setPrice(Number(e.target.value))}
								/>
							</div>

							<button
								type="submit"
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
							>Add</button>
						</form>

						{ loading && <p>Cargando...</p>}

						{ error && <p className="alert alert-danger p2 mt-4">Hubo un error...</p>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewProduct;