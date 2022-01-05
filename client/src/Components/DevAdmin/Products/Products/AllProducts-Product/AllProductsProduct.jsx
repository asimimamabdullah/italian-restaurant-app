import React from "react";
import "./AllProductsProduct.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import axios from "axios";
import Loading from "../../../../Screens/Global/Loading";

const AllProductsProduct = ({
  _id,
  images,
  description,
  title,
  price,
  category,
  token,
  loading,
  setLoading,
  setSuccess,
  setError,
  callback,
  setCallback,
}) => {
  const handleEdit = async () => {
    console.log("edit");
  };
  const deleteCategoryImage = async (pub_id) => {
    try {
      if (pub_id) {
        await axios.post(
          "/api/destroy",
          {
            public_id: pub_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token[0]}`,
            },
          }
        );
      }

      if (!pub_id) {
        await axios.post(
          "/api/destroy",
          {
            public_id: images.public_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token[0]}`,
            },
          }
        );
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/api/product/${id}`);

      return res;
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  const handleDelete = async (id, images) => {
    setLoading(true);
    deleteCategoryImage(images.public_id)
      .then(() => deleteProduct(id))
      .then((response) => {
        setCallback(!callback);
        setLoading(false);
        setSuccess(response.data.message);
      });
  };

  if (loading) return <Loading />;

  if (!loading)
    return (
      <div className="allproducts__product">
        <div className="allproducts__items">
          <img
            src={images?.url}
            alt=""
            className="allproducts__items__image"
            loading="lazy"
          />

          <div className="allproducts__items__text">
            <span className="allproducts__items__title">{title}</span>
            <br />
            <span className="allproducts__items__description">
              {description?.substr(0, 60)}...
            </span>

            <div className="allproducts__items__price-rating">
              <span className="allproducts__items__price">
                € {parseFloat(price).toFixed(2)}
              </span>
              <span className="allproducts__items__button">{category}</span>
            </div>
          </div>

          <div className="allproducts__edit-delete">
            <button onClick={handleEdit}>
              <EditRoundedIcon />
            </button>
            <button onClick={() => handleDelete(_id, images)}>
              <DeleteRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    );
};

export default AllProductsProduct;
