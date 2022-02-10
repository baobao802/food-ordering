import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Thanh toán bằng PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        {/* <div>
          <h1>Payment Method</h1>
        </div> */}
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="Thanh toán bằng PayPal"
              name="paymentMethod"
              required
              checked={paymentMethod === "Thanh toán bằng PayPal"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></input>
            <label htmlFor="paypal">Thanh toán qua PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="byCash"
              value="Thanh toán bằng tiền mặt"
              name="paymentMethod"
              checked={paymentMethod === "Thanh toán bằng tiền mặt"}
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="byCash">Thanh toán khi nhận hàng</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
}
