import React from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

// redux
import { useDispatch } from "react-redux";
import { deleteProductAction, editProductAction } from "../actions/productActions";

const Product = ({ product }) => {
	const { name, price, id } = product;
	const dispatch = useDispatch();
	const navigate = useNavigate(); // handle navigation

	const handleOnClick = id => {
		// confim with the user
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.isConfirmed) {
				// send to the action
				dispatch( deleteProductAction(id) );
			}
		})
	}

	// redirect programatically
	const handleEditProduct = product => {
		dispatch(editProductAction(product));
		navigate(`/products/edit/${id}`);
	}

	return (
		<tr>
			<td>{name}</td>
			<td><span className="font-weight-bold">$ {price}</span></td>
			<td className="actions">
				<button
					type="button"
					className="btn btn-primary mr-2"
					onClick={() => handleEditProduct(product)}
				>Edit</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => handleOnClick(id)}
				>Delete</button>
			</td>
		</tr>
	)
}

export default Product;