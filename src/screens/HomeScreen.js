import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";
import "../index.css";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div
      style={{
        backgroundColor: "#f7f7f7",
        padding: "2rem",
        height: "100%",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          color: "rgb(13, 17, 54)",
          padding: "0.5rem 0",
        }}
      >
        <i
          style={{ color: "#f0c040", marginRight: "5px" }}
          class="fa fa-star"
          aria-hidden="true"
        ></i>{" "}
        Sản phẩm nổi bật
      </h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && (
            <MessageBox>Không tìm thấy sản phẩm nào!</MessageBox>
          )}
          <div className="homepage-container">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
