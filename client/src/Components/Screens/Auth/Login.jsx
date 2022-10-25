import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "./../../../StateProvider";

const Login = () => {
	const { userAPI } = useStateValue();
	const [isLoggedIn] = userAPI.isLoggedIn;
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/user/login", {
				email: user.email,
				password: user.password,
			});

			localStorage.setItem("login", true);
			localStorage.setItem("refreshToken", response?.data.accessToken);
			window.location.href = "/";
		} catch (err) {
			setError(err.response.data.error);
			setTimeout(() => {
				setError(null);
			}, 2000);
		}
	};

	const onChangeInput = (e) => {
		const { name, value } = e.target;

		setUser({ ...user, [name]: value });
	};
	if (isLoggedIn) window.location.href = "/";

	return (
		<div className="login" onSubmit={handleSubmit}>
			{error && <div className="error__box">{error}</div>}

			<div className="login__container">
				<div className="login-title">
					<h1>Login</h1>
				</div>
				<form className="login__form">
					<div className="login__input-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							className="login__email login__input"
							placeholder="Email"
							value={user.email}
							onChange={onChangeInput}
						/>
					</div>

					<div className="login__input-group">
						<label htmlFor="Password">Password</label>
						<input
							type="password"
							name="password"
							className="login__password login__input"
							placeholder="Password"
							value={user.password}
							onChange={onChangeInput}
						/>
					</div>
					<span className="login__register">
						Non un utente? <Link to="/register"> Registrati qui</Link>
					</span>
					<button type="submit" className="login__submit-button login__input">
						Invia
					</button>

					<span className="forgot-password">
						Forgot Password ? <Link to="/forgotpassword">Forgot Password</Link>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Login;
