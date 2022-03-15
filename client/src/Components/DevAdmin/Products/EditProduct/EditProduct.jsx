import React, { useState } from "react";
import axios from "axios";
import "../CreateProduct.css";

import { useNavigate, useParams } from "react-router-dom";
import { useStateValue } from "./../../../../StateProvider";
import Loading from "./../../../Screens/Global/Loading";

const EditProduct = () => {
	const navigate = useNavigate();
	const params = useParams();
	const index = params.index;
	const { categoriesAPI, productsAPI, userAPI, token } = useStateValue();
	const [isAdmin] = userAPI.isAdmin;
	const [categories] = categoriesAPI.categories;
	const [callback, setCallback] = productsAPI.callback;
	const [products] = productsAPI.products;

	const [imageUpload, setImageUpload] = useState(false);
	const [imageShow, setImageShow] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [data, setData] = useState({
		product_id: products[index].product_id,
		title: products[index].title,
		description: products[index].description,
		price: products[index].price,
		category: products[index].category,
		images: products[index].images,
	});

	const handleFileChange = async (e) => {
		const getFile = e.target.files[0];
		if (!getFile) return alert("File Doesn't exist");

		let formData = new FormData();
		formData.append("file", getFile);
		setImageUpload(formData);
		const reader = new FileReader();

		reader.onloadend = () => {
			setImageShow(reader.result);
		};

		reader.readAsDataURL(getFile);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setData((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const cancelImage = () => {
		setImageShow(null);
		setImageUpload(false);
		setData((prevValues) => ({ ...prevValues, images: null }));
	};

	const funcWithoutImg = async (e) => {
		e.preventDefault();
		try {
			const res = await axios
				.put(
					`/api/product/${products[index]._id}`,
					{
						...data,
					},
					{
						headers: {
							Authorization: `Bearer ${token[0]}`,
						},
					},
				)
				.then(() => {
					setCallback(!callback);
					setLoading(false);
					navigate("/dashboard/products");
				});

			return res;
		} catch (error) {
			setError(error.response.data.error);
			setLoading(false);
			return error.response.data;
		}
	};

	if (!isAdmin) {
		return (
			<h1 style={{ margin: "15px", color: "red", letterSpacing: "2px" }}>
				You don't have permission to visit this route
			</h1>
		);
	}

	if (error) {
		setTimeout(() => {
			setError(null);
		}, 2000);
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="create__product">
			{error && <div className="error__box">{error}</div>}
			<h1 style={{ margin: "0 30px " }}>Create Product</h1>

			<form onSubmit={funcWithoutImg} className="create__product-form">
				<div className="create__product-container-leftSection">
					{!products[index].images && (
						<input
							type="file"
							name="file"
							onChange={handleFileChange}
							className="create__product-leftSection-image-input"
						/>
					)}
					{products[index].images && (
						<div className="create__product-image-preview">
							<img
								src={products[index].images.url}
								alt=""
								width="100%"
								height="100%"
								style={{ objectFit: "cover" }}
							/>

							<div
								className="create__product-cancel-image"
								onClick={cancelImage}>
								X
							</div>
						</div>
					)}
				</div>

				<div className="create__product-container-rightSection">
					<div className="create__product-input">
						<input
							required
							type="text"
							placeholder="Product Id"
							value={data.product_id}
							onChange={handleChange}
							name="product_id"
						/>
					</div>

					<div className="create__product-input">
						<input
							required
							type="text"
							name="title"
							placeholder="Title"
							value={data.title}
							onChange={handleChange}
						/>
					</div>

					<div className="create__product-input">
						<input
							type="text"
							placeholder="Description"
							value={data.description}
							onChange={handleChange}
							name="description"
						/>
					</div>

					<div className="create__product-input">
						<input
							required
							type="text"
							placeholder="Price"
							value={data.price}
							onChange={handleChange}
							name="price"
						/>
					</div>
					<div className="create__product-input">
						<select
							name="category"
							onChange={handleChange}
							defaultValue={products[index].category}
							required>
							<option value="Category" disabled>
								Select Category
							</option>
							{categories.map((category, i) => (
								<option key={i} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<button className="create__product-form-button">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
