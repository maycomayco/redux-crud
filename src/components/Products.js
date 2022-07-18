import React, { useEffect} from "react";
import Product from "./Product";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getProductsAction } from "../actions/productActions";

const Products = () => {
	const dispatch = useDispatch();

	useEffect( () => {
		// get API, when the component is loaded
		const loadProducts = () => dispatch(getProductsAction());
		loadProducts();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// get the state
	const products = useSelector( state => state.products.products);
	const error = useSelector(state => state.products.error);
	const loading = useSelector(state => state.products.loading);

	return (
		<>
			<h2 className="text-center my-5">Product List</h2>

			{ error &&
				<p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p>
			}

			{ loading &&
				<p className="text-center mt-2">Loading...</p>
			}

			<table className="table table-stripped">
				<thead className="bg-primary table-dark">
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Price</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{ products.length === 0 ?
						<p className="text-center mt-2">No hay productos para mostrar</p> :
						(
							products.map(p => (
								<Product
									key={p.id}
									product={p}
								/>
							))
						)
					}
				</tbody>
			</table>
		</>
	)
}

export default Products;