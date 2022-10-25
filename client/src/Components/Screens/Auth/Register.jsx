import React, { useState } from "react";
import "./Register.css";

import axios from "axios";
import Loading from "../Global/Loading";
import { useStateValue } from "./../../../StateProvider";

const Register = () => {
	const state = useStateValue();
	const [, setToken] = state.token;
	const [isLoggedIn] = state.userAPI.isLoggedIn;
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
		phone: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (registerForm.password !== registerForm.confirmPassword) {
			alert("Passwords doesn't match");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post("/api/user/register", {
				...registerForm,
			});
			setLoading(false);
			setToken(response.data.accessToken);

			localStorage.setItem("login", true);
			window.location.href = "/";
		} catch (err) {
			setLoading(false);
			setError(err.response.data.error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRegisterForm((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
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
					<div className="register__user">
						<h3 className="register__user-title">Please Provide Your Info</h3>

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
						<h3 className="register__address-title">Provide Address</h3>

						<div className="register__input-group">
							<input
								type="text"
								name="phone"
								placeholder="Phone no."
								className="register__input"
								value={registerForm.phone}
								required
								onChange={handleInputChange}
							/>
						</div>

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
							<select defaultValue="City" name="city" className="register__input" onChange={handleInputChange}>
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
