import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
import "../index.css";

export default function ProductScreen(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formatPriceVND = (currency) => {
    if (typeof currency === "string") {
      return currency.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const params = useParams();
  const { id: productId } = params;

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    // navigate(`/cart/${productId}?qty=${qty}`);
    dispatch(addToCart(productId, qty));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Vui lòng đánh giá và nhập bình luận!");
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="custom-row top" style={{ justifyContent: "unset" }}>
            <div className="col" style={{ width: "50%" }}>
              <img
                style={{ borderRadius: 0 }}
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col" style={{ width: "50%" }}>
              <div style={{ padding: "1.5em 3em", fontSize: "1.5em" }}>
                <Link
                  style={{
                    color: "#465bad",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  to="/"
                >
                  <i
                    style={{ marginRight: "5px" }}
                    class="fa fa-arrow-left"
                    aria-hidden="true"
                  ></i>
                  Quay về trang tìm kiếm
                </Link>
                <div
                  style={{
                    display: "flex",
                    fontSize: "2em",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: 700,
                    color: "#0d1136",
                    marginTop: "50px",
                    marginBottom: "10px",
                  }}
                >
                  <div>{product.name}</div>
                </div>
                <div style={{ marginBottom: "50px" }}>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </div>

                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.8em",
                    color: "#0d1136",
                    marginBottom: "20px",
                  }}
                >
                  Giá:{" "}
                  <span style={{ color: "#20a020", fontWeight: 700 }}>
                    {formatPriceVND(product.price)} VND
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.8em",
                    color: "#0d1136",
                    marginBottom: "20px",
                  }}
                >
                  Mô tả:{" "}
                  <span
                    style={{ color: "rgb(119, 121, 140)", fontWeight: 400 }}
                  >
                    {product.description}
                  </span>
                </div>
                {/* <div style={{color: 'rgb(119, 121, 140)'}}>
                  <p style={{fontSize: '0.7em'}}>{product.description}</p>
                </div> */}
                <div className="custom-row">
                  <div>
                    {product.countInStock > 0 ? (
                      <span
                        className="success"
                        style={{
                          fontSize: "0.8em",
                          marginBottom: "20px",
                          fontWeight: 600,
                        }}
                      >
                        {" "}
                      </span>
                    ) : (
                      <span
                        className="danger"
                        style={{ fontSize: "0.8em", marginBottom: "20px" }}
                      >
                        Không có sẵn
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="custom-row"
                  style={{ marginTop: "20px", justifyContent: "unset" }}
                >
                  {product.countInStock > 0 && (
                    <>
                      <div>
                        <div className="custom-row">
                          <div
                            style={{
                              fontSize: "0.8em",
                              color: "rgb(13, 17, 54)",
                              fontWeight: 600,
                              marginRight: "10px",
                            }}
                          >
                            Số lượng
                          </div>
                          <div>
                            <select
                              style={{ border: 0, outline: 0 }}
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div
                            style={{
                              fontSize: "0.8em",
                              color: "rgb(13, 17, 54)",
                              fontWeight: 600,
                              marginLeft: "10px",
                            }}
                          >
                            Kg
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                        marginLeft: "30px",
                      }}
                      onClick={addToCartHandler}
                      className="primary block"
                    >
                      <img
                        style={{ width: "25px", marginRight: "5px" }}
                        src="/images/logoIcon.png"
                        alt={product.name}
                      />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="custom-row">
              <div style={{ width: "50%" }}>
                {userInfo ? (
                  <form
                    style={{ padding: "0 3rem" }}
                    className="form"
                    onSubmit={submitHandler}
                  >
                    <div>
                      <h2>
                        Để lại đánh giá của bạn giúp chúng tôi cải thiện chất
                        lượng dịch vụ của mình.
                      </h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Đánh giá</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Chọn...</option>
                        <option value="1">1- Tệ</option>
                        <option value="2">2- Bình thường</option>
                        <option value="3">3- Tốt</option>
                        <option value="4">4- Rất tốt</option>
                        <option value="5">5- Xuất sắc</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Bình luận</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Gửi đánh giá
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Vui lòng <Link to="/signin">Đăng nhập</Link> để đánh giá.
                  </MessageBox>
                )}
              </div>
              {product.reviews.length === 0 ? (
                <div style={{ margin: "auto" }}>
                  <MessageBox>Chưa có đánh giá</MessageBox>
                </div>
              ) : (
                <div style={{ width: "50%" }}>
                  <div style={{ padding: "70px" }}>
                    <div>
                      <h2
                        style={{ color: "rgba(236,72,153)", fontWeight: 400 }}
                      >
                        Một số nhận xét :
                      </h2>
                    </div>
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <div key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating rating={review.rating} caption=" "></Rating>
                          <p>{review.comment}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
