import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../index.css";
export default function Product(props) {
  const { product, isCategory } = props;
  const formatPriceVND = (currency) => {
    if (typeof currency === "string") {
      return currency.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div
      key={product._id}
      className="homepage-item"
      style={
        isCategory && { maxWidth: "21%", flex: "0 0 21%", marginRight: "4.0%" }
      }
    >
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h1 style={{ color: "rgb(13, 17, 54)", fontWeight: 600 }}>
            {product.name}
          </h1>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="custom-row" style={{ marginTop: "20px" }}>
          <div className="price">{formatPriceVND(product.price)} VND</div>
        </div>
      </div>
    </div>
  );
}
