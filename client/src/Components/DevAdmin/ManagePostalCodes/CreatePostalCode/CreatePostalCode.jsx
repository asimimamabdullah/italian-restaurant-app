import React from "react";
import "./CreatePostalCode.css";

const CreatePostalCode = ({
  modalActive,
  closeModal,
  editModal,
  handlePostalCodeUpdate,
  handlePostalCodeSubmit,
  postalData,
  handleInputChange,
  setCreateModalActive,
  createModalActive,
}) => {
  return (
    <div
      className="postalCode__modalMain"
      style={{ display: modalActive ? "block" : "none" }}>
      <div className="create__postalCode-modal">
        <div className="postalCode__closeBtn" onClick={closeModal}>
          X
        </div>
        <form
          className="create__postalCode-modal-container"
          onSubmit={
            editModal ? handlePostalCodeUpdate : handlePostalCodeSubmit
          }>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            name="postalCode"
            value={postalData.postalCode}
            onChange={handleInputChange}
            type="number"
            placeholder="Enter Postal Code"
            className="create_postalCode-modal-input"
          />

          <label htmlFor="minOrder">Minimum Order €</label>
          <input
            name="minOrder"
            value={postalData.minOrder}
            onChange={handleInputChange}
            type="number"
            placeholder="Minimum Order"
            className="create_postalCode-modal-input"
          />

          <label htmlFor="deliveryPrice">Delivery Price €</label>
          <input
            name="deliveryPrice"
            value={postalData.deliveryPrice}
            onChange={handleInputChange}
            type="number"
            placeholder="Delivery Price"
            className="create_postalCode-modal-input"
          />

          <label htmlFor="estimatedTime">
            Estimated Time{" "}
            <span style={{ fontSize: "small" }}> (in minutes)</span>
          </label>
          <input
            name="estimatedTime"
            value={postalData.estimatedTime}
            onChange={handleInputChange}
            type="number"
            placeholder="Estimated Time"
            className="create_postalCode-modal-input"
          />
          <div className="postalCode__box-btn-sec">
            <button
              type="button"
              onClick={() => setCreateModalActive(true)}
              style={{
                background: createModalActive ? "green" : "#ddd",
                color: createModalActive ? "white" : "black",
              }}>
              active
            </button>
            <button
              type="button"
              onClick={() => setCreateModalActive(false)}
              style={{
                background: !createModalActive ? "red" : "#ddd",
                color: !createModalActive ? "white" : "black",
              }}>
              offline
            </button>
          </div>
          {editModal ? (
            <div className="create__modal-submit">
              <button
                type="submit"
                className="create__modal-submit-button 
            create__postalCode-button">
                Update
              </button>
            </div>
          ) : (
            <div className="create__modal-submit">
              <button
                type="submit"
                className="create__modal-submit-button 
              create__postalCode-button">
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePostalCode;
