import React, { useState } from "react";
import "./CreateProduct.css";
import axios from "axios";
import { useStateValue } from "../../../StateProvider";
import Loading from "../../Screens/Global/Loading";

import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { categoriesAPI, productsAPI, userAPI, token } = useStateValue();
  const [isAdmin] = userAPI.isAdmin;
  const [categories] = categoriesAPI.categories;
  const [callback, setCallback] = productsAPI.callback;

  const [imageUpload, setImageUpload] = useState(false);
  const [imageShow, setImageShow] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    product_id: "",
    title: "",
    description: "",
    price: "",
    category: "",
    images: "",
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
  };

  const uploadImage = async () => {
    try {
      const res = await axios.post("/api/upload", imageUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const funcWithImg = async (d) => {
    try {
      const res = await axios.post(
        "/api/products",
        {
          ...data,
          images: { public_id: d.data.public_id, url: d.data.url },
        },
        {
          headers: {
            Authorization: `Bearer ${token[0]}`,
          },
        }
      );
      setCallback(!callback);
      setLoading(false);
      navigate("/dashboard/products");

      return res;
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
      return error.response.data;
    }
  };

  const funcWithoutImg = async () => {
    try {
      const res = await axios.post(
        "/api/products",
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token[0]}`,
          },
        }
      );
      setCallback(!callback);
      setLoading(false);
      navigate("/dashboard/products");

      return res;
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
      return error.response.data;
    }
  };

  const productFunc = async (d) => {
    if (d) {
      funcWithImg(d);
    }
    if (!d) {
      funcWithoutImg();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUpload) {
      setLoading(true);
      uploadImage().then(productFunc);
    }
    if (!imageUpload) {
      productFunc();
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

      <form onSubmit={handleSubmit} className="create__product-form">
        <div className="create__product-container-leftSection">
          {!imageShow && (
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="create__product-leftSection-image-input"
            />
          )}
          {imageShow && (
            <div className="create__product-image-preview">
              <img
                src={imageShow}
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
              defaultValue="Category"
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

export default CreateProduct;
