import React, { useEffect, useState } from "react";
import "./PostalCodes.css";

import axios from "axios";
import Loading from "./../../Screens/Global/Loading";
import PostalCodeBox from "./PostalCodeBox/PostalCodeBox";
import CreatePostalCode from "./CreatePostalCode/CreatePostalCode";
import PostalHeader from "./PostalHeader/PostalHeader";
import { useStateValue } from "./../../../StateProvider";
import NotFound from "./../../Screens/Global/NotFound";

const PostalCodes = () => {
  const { userAPI } = useStateValue();
  const [isAdmin] = userAPI.isAdmin;
  const [createModalActive, setCreateModalActive] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [allOffline] = useState(false);
  const [error, setError] = useState("");
  const [codes, setCodes] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [callback, setCallback] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postalData, setPostalData] = useState({
    postalCode: "",
    minOrder: "",
    deliveryPrice: "",
    estimatedTime: "",
  });

  const handleDel = (id) => {
    const arr = codes;
    arr.splice(id, 1);
    setCodes(arr);
  };

  const [activePostalCodes, setActivePostalCodes] = useState(0);

  const postalDataInit = () => {
    setPostalData({
      postalCode: "",
      minOrder: "",
      deliveryPrice: "",
      estimatedTime: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPostalData((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const closeModal = () => {
    if (modalActive) {
      setModalActive(false);
      setEditModal(false);
      postalDataInit();
    }
  };

  const handlePostalCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post("/api/dashboard/postalcodes", {
          ...postalData,
          active: createModalActive,
        })
        .then(() => {
          postalDataInit();
          closeModal();
          setCallback(!callback);
          setLoading(false);
          setActivePostalCodes(0);
        });
    } catch (error) {
      setLoading(false);
      closeModal();
      postalDataInit();
      setError(error.response.data.error);
    }
  };

  const handlePostalCodeUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .patch(`/api/dashboard/postalcodes/${updateId}`, {
          ...postalData,
          active: createModalActive,
        })
        .then(() => {
          postalDataInit();
          closeModal();
          setCallback(!callback);
          setActivePostalCodes(0);
        });
    } catch (error) {
      setLoading(false);
      closeModal();
      postalDataInit();
      setError(error.response.data.error);
    }
  };

  const getCodes = async () => {
    try {
      return await axios.get("/api/dashboard/postalcodes").then((response) => {
        setCodes(response.data.codes);
        response.data.codes.forEach((c) => {
          if (c.active === true) {
            setActivePostalCodes((prevValue) => prevValue + 1);
          }
        });
      });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    setActivePostalCodes(0);

    getCodes();
  }, [callback]);

  useEffect(() => {
    if (modalActive) {
      const modal = document.querySelector(".create__postalCode-modal");

      document.onclick = (e) => {
        if (e.target === modal) {
          setModalActive(false);
          setEditModal(false);
          postalDataInit();
        }
      };
    }
  }, [modalActive]);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }

  if (!isAdmin) return <NotFound />;

  if (loading && isAdmin) return <Loading />;

  return (
    <div className="manage__postalCodes">
      {error && <div className="error__box">{error}</div>}

      <PostalHeader
        codes={codes}
        allOffline={allOffline}
        activePostalCodes={activePostalCodes}
      />

      <div className="create__postalCode">
        <button
          className="create__postalCode-button"
          onClick={() => setShowButtons(!showButtons)}>
          Delete / Edit
        </button>
        <button
          className="create__postalCode-button"
          onClick={() => setModalActive(true)}>
          Add New
        </button>
      </div>

      <CreatePostalCode
        modalActive={modalActive}
        closeModal={closeModal}
        editModal={editModal}
        handlePostalCodeUpdate={handlePostalCodeUpdate}
        handlePostalCodeSubmit={handlePostalCodeSubmit}
        postalData={postalData}
        handleInputChange={handleInputChange}
        setCreateModalActive={setCreateModalActive}
        createModalActive={createModalActive}
      />

      {codes ? (
        codes.map((postalCode, i) => (
          <PostalCodeBox
            key={postalCode._id}
            {...postalCode}
            showButtons={showButtons}
            setCallback={setCallback}
            postalData={postalData}
            setPostalData={setPostalData}
            setModalActive={setModalActive}
            setCreateModalActive={setCreateModalActive}
            setEditModal={setEditModal}
            setUpdateId={setUpdateId}
            setError={setError}
            handleDel={handleDel}
            index={i}
            callback={callback}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PostalCodes;
