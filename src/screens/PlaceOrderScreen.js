import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../index.css';

export default function PlaceOrderScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice ;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="custom-row top" style={{color:'rgb(13, 17, 54)'}}>
        <div className="col-2">
          <div>
            <div>
              <div className="card card-body" style={{border:0,boxShadow:'rgb(0 0 0 / 8%) 0px 2px 16px 0px'}}>
              <div class="flex items-center text-xl checkout-title"><p class="part-number">1</p> <h2>Shipping</h2> </div>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.country}
                </p>
              </div>
            </div>
            <div>
              <div className="card card-body" style={{border:0,boxShadow:'rgb(0 0 0 / 8%) 0px 2px 16px 0px'}}> 
              <div class="flex items-center text-xl checkout-title"><p class="part-number">2</p> <h2>Payment</h2> </div>
                <p>
                  <strong>Method:</strong> By cash
                </p>
              </div>
            </div>
            <div>
              <div className="card card-body" style={{border:0,boxShadow:'rgb(0 0 0 / 8%) 0px 2px 16px 0px'}}>
              <div class="flex items-center text-xl checkout-title"><p class="part-number">3</p> <h2>Order Items</h2> </div>
                <div>
                  {cart.cartItems.map((item) => (
                    <div style={{padding: '0.5rem'}} key={item.product}>
                      <div className="custom-row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          <span style={{fontWeight:600}}>{item.qty} </span> x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1">
          <div className="card card-body" style={{border:0}}>
            <div>
              <div>
                <h2>Order Summary</h2>
              </div>
              <div>
                <div className="custom-row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </div>
              <div>
                <div className="custom-row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </div>
              <div>
                <div className="custom-row">
                  <div>
                    <strong> Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </div>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
