import React, { useState } from "react";
import "./Register.css";

import axios from "axios";
import Loading from "../Global/Loading";
import { useStateValue } from "./../../../StateProvider";

const Register = () => {
  const { userAPI } = useStateValue();
  const [isLoggedIn] = userAPI.isLoggedIn;
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    images: "",
    password: "",
    confirmPassword: "",
    postalCode: "",
    address: "",
    building: "",
    city: "",
  });

  const [fileImage, setFileImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const getFile = e.target.files[0];
    if (!getFile) return alert("File Doesn't exist");

    let formData = new FormData();
    formData.append("file", getFile);
    setImageUpload(formData);

    const reader = new FileReader();

    reader.readAsDataURL(getFile);
    reader.onloadend = () => {
      setFileImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords doesn't match");
      setLoading(false);
      return;
    }

    const upload = async () => {
      try {
        const res = await axios.post("/api/upload", imageUpload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res;
      } catch (error) {
        setLoading(false);
        console.log("error occured", error.response.data.error);
        setError(error.response.data.error);
      }
    };

    const register = async (d) => {
      try {
        if (d) {
          await axios.post("/api/user/register", {
            ...registerForm,
            images: { public_id: d.data.public_id, url: d.data.url },
          });

          setLoading(false);
        }

        if (!d) {
          await axios.post("/api/user/register", {
            ...registerForm,
          });
          setLoading(false);
        }

        localStorage.setItem("login", true);
        window.location.href = "/";
      } catch (err) {
        setLoading(false);
        setError(err.response.data.error);
      }
    };

    try {
      if (fileImage) {
        upload().then(register);
      }
      if (!fileImage) {
        register();
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const clearImage = () => {
    setImageUpload(null);
    setFileImage(null);
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  if (loading) return <Loading />;
  if (isLoggedIn) window.location.href = "/";

  return (
    <div className="register">
      {error && <div className="error__box">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="register__form">
          <div className="register__img">
            <h3
              style={{
                letterSpacing: "1.3px",
                padding: "10px 20px",
                userSelect: "none",
              }}>
              Choose Profile
            </h3>
            {!fileImage && (
              <input
                type="file"
                className="register__img-input"
                onChange={handleFileChange}
              />
            )}
            {fileImage && (
              <img style={{ userSelect: "none" }} src={fileImage} alt="" />
            )}
            {fileImage && (
              <span className="register__form-clear-img" onClick={clearImage}>
                Clear Image
              </span>
            )}
          </div>

          <div className="register__user">
            <h3 style={{ letterSpacing: "1.3px", userSelect: "none" }}>
              Please Provide Your Info
            </h3>

            <div className="register__input-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                required
                className="register__input"
                value={registerForm.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="register__input-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                required
                className="register__input"
                value={registerForm.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="register__input-group">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                className="register__input"
                value={registerForm.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="register__input-group">
              <input
                type="password"
                name="password"
                placeholder="Password *"
                required
                className="register__input"
                value={registerForm.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="register__input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                required
                className="register__input"
                value={registerForm.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="register__address">
            <h3 style={{ letterSpacing: "1.3px", userSelect: "none" }}>
              Provide Address
            </h3>

            <div className="register__input-group">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="register__input"
                value={registerForm.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="register__input-group">
              <input
                type="text"
                name="building"
                placeholder="eg. building #01 floor 2, flat 34"
                className="register__input"
                value={registerForm.building}
                onChange={handleInputChange}
              />
            </div>

            <div className="register__input-group">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                className="register__input"
                value={registerForm.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="register__input-group">
              <select
                defaultValue="City"
                name="city"
                className="register__input"
                onChange={handleInputChange}>
                <option value="City" disabled>
                  Select City
                </option>
                <option value="Carpi">Carpi</option>
              </select>
            </div>

            <div className="register__input-group">
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="register__input"
                value="Italy"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button className="register__submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
