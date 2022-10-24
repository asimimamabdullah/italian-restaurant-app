import React from "react";
import { Link } from "react-router-dom";
import "./ItemProduct.css";

const ItemProduct = ({ title, description, price, images }) => {
	return (
		<Link to="/order" className="item__main">
			<div className="item">
				<img
					src={
						images.url && images.url.endsWith("webp")
							? images.url.replace("webp", "jpg")
							: images.url
					}
					alt=""
					className="item__image"
					loading="lazy"
				/>

				<div className="item__text">
					<span className="item__title">{title && title}</span>
					<br />
					<span className="item__description">
						{description?.substr(0, 60)}...
					</span>

					<div className="item__price-rating">
						<span className="item__price">€ {price && price}</span>
						<span className="item__button">
							<button>Ordina Adesso!</button>
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ItemProduct;
