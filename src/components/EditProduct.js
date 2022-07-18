import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useDispatch para ejecutar las acciones, useSelector para acceder al state
import { useNavigate } from "react-router-dom";

import { editProductDBAction } from "../actions/productActions";

const EditProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// local state to handle product
	const [ product, setProduct ] = useState({
		name: '',
		price: ''
	})

	// get the product from redux to edit
	const productToEdit = useSelector(state => state.products.productToEdit);

	// llenar state automaticamente
	useEffect(() => {
		setProduct(productToEdit)
	}, [productToEdit]);

	// leer datos from form
	const onChangeForm = e => {
		// update local state
		setProduct({
			...product,
			[e.target.name]: e.target.value
		})
	};

	// populate the form
	const { name, price} = product;

	const handleSubmit = e => {
		e.preventDefault();

		// update DB
		dispatch(editProductDBAction(product));

		// redirect to home
		navigate('/');
	}

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">Edit product</h2>

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
									onChange={onChangeForm}
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
									onChange={onChangeForm}
								/>
							</div>

							<button
								type="submit"
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
							>Edit product</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditProduct;