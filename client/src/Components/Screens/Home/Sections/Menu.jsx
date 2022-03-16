import React from "react";
import "./Menu.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useStateValue } from "../../../../StateProvider";
import { Link } from "react-router-dom";

const Menu = () => {
	const { categoriesAPI, productsAPI } = useStateValue();
	const [categories] = categoriesAPI.categories;
	const [products] = productsAPI.products;

	return (
		<div className="menu">
			<h1 className="menu__title">Our Menu</h1>

			<div className="menu__categories">
				{categories?.slice(0, 5).map((cat, i) => (
					<div className="menu__category" key={i}>
						<h2 className="menu__category-title">{cat.name}</h2>

						<ul className="menu__category-list">
							{products
								?.filter((item) => item.category === cat.name)
								.map((item, index) => (
									<li key={index}>{item.title}</li>
								))}
						</ul>
					</div>
				))}
				<div className="footer__order-page-link">
					<p className="footer__order-page-link-text">
						Clicca qui per vedere il menu completo
					</p>
					<Link className="menu-to-menuscreen-arrow" to="/menu">
						<ArrowForwardRoundedIcon />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Menu;
