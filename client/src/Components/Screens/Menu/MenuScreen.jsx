import React from "react";
import "./MenuScreen.css";

import image from "../../Images/white-wood-textures.jpg";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Footer from "../Home/Sections/Footer";
import { useStateValue } from "../../../StateProvider";

const MenuScreen = () => {
	const { productsAPI, categoriesAPI } = useStateValue();
	const [products] = productsAPI.products;
	const [categories] = categoriesAPI.categories;
	return (
		<>
			<div className="menu-screen">
				<h1>Our Menu</h1>
				<img src={image} alt="" />

				<div className="menu-screen__content">
					{categories?.map((cat, i) => (
						<div className="menu-screen__group" key={i}>
							<h3 className="menu-screen__group-title">{cat.name}</h3>
							<div className="menu-screen__group-image">
								<img src={cat.images?.url} alt="" />
							</div>
							{products
								?.filter((item) => item.category === cat.name)
								.map((product, index) => (
									<div className="subText__group" key={index}>
										<div className="subText__group-container">
											<p className="menu-screen__group-subText">
												{product.title}
											</p>
											<br />
											<p className="menu-screen__group-subText-short">
												{product?.description
													? "(" + product.description + ")"
													: ""}
											</p>
										</div>
									</div>
								))}
						</div>
					))}

					<div className="footer__order-page-link">
						<h4>Prendi Subito il tuo Cibo Preferito!</h4>
						<span
							onClick={() => (window.location.href = "/order")}
							className="menu-to-menuscreen-arrow">
							<ArrowForwardRoundedIcon />
						</span>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MenuScreen;
