import React from "react";

import "./DisbaleScreen.css";

const DisableScreen = ({ setHeaderOpened }) => {
	const removeSideNav = () => {
		const bars = document.querySelector(".header__bars");

		const dashboard = document.querySelector(".dashboard");
		let sideNav;

		if (dashboard) {
			sideNav = document.querySelector(".dashboard");
		}
		if (!dashboard) {
			sideNav = document.querySelector(".header__side-nav");
		}
		setHeaderOpened(false);
		if (sideNav && bars.classList.value.includes("bars-opened") && bars) {
			bars.classList.remove("bars-opened");

			sideNav.style.left = "-100%";
		}
	};
	return <div className="DisableScreen" onClick={removeSideNav}></div>;
};

export default DisableScreen;
