import React, { useState } from "react";
import "./PostalCodeBox.css";
import axios from "axios";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Loading from "./../../../Screens/Global/Loading";

const PostalCodeBox = ({
  _id,
  postalCode,
  minOrder,
  deliveryPrice,
  estimatedTime,
  active,
  showButtons,
  callback,
  setCallback,
  setPostalData,
  setModalActive,
  setCreateModalActive,
  setEditModal,
  setUpdateId,
  setError,
  handleDel,
  index,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeBox, setActiveBox] = useState(active);

  const editButton = () => {
    setPostalData({
      postalCode,
      minOrder,
      deliveryPrice,
      estimatedTime,
    });
    setUpdateId(_id);
    setEditModal(true);
    setCreateModalActive(active);
    setModalActive(true);
  };

  const updateActive = async (val) => {
    setLoading(true);
    try {
      await axios
        .patch(`/api/dashboard/postalcodes/${_id}`, {
          postalCode,
          minOrder,
          deliveryPrice,
          estimatedTime,
          active: val,
        })
        .then(() => {
          setLoading(false);
          setActiveBox(val);
          setCallback(!callback);
        });
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  const deletePostalCode = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/dashboard/postalcodes/${_id}`).then(() => {
        setLoading(false);
      });
      setCallback(!callback);
      handleDel(index);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="postalCode__box">
      <>
        <div className="postalCode__box-code postalCode__box-sec">
          <span className="postalCode__box-title">postal code</span>
          <span className="postalCode__box-value">{postalCode}</span>
        </div>

        <div className="postalCode__box-sec">
          <span className="postalCode__box-title">min Order</span>
          <span className="postalCode__box-value">{minOrder}</span>
        </div>

        <div className="postalCode__box-sec">
          <span className="postalCode__box-title">delivery price</span>
          <span className="postalCode__box-value">{deliveryPrice}</span>
        </div>

        <div className="postalCode__box-sec">
          <span className="postalCode__box-title"> estimated time</span>
          <span className="postalCode__box-value">{estimatedTime}</span>
        </div>

        <div className="postalCode__box-btn-sec">
          <button
            onClick={() => updateActive(true)}
            style={{
              background: activeBox ? "green" : "#ddd",
              color: activeBox ? "white" : "black",
            }}>
            active
          </button>
          <button
            onClick={() => updateActive(false)}
            style={{
              background: !activeBox ? "red" : "#ddd",
              color: !activeBox ? "white" : "black",
            }}>
            offline
          </button>
        </div>
      </>

      {showButtons && (
        <div className="postalCode__box-btns">
          <button className="postalCode__box-btns-btn" onClick={editButton}>
            <EditRoundedIcon className="editIcon" />
          </button>
          <button
            className="postalCode__box-btns-btn"
            onClick={deletePostalCode}>
            <DeleteRoundedIcon className="deleteIcon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostalCodeBox;
