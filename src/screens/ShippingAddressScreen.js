import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import '../index.css';

export default function ShippingAddressScreen(props) {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    navigate('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || '',
  );
  const [country, setCountry] = useState(shippingAddress.country || '');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          phone,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        }),
      );
      navigate('/payment');
    }
  };

  return (
    <div style={{ paddingTop: '2rem' }}>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Địa chỉ giao hàng</h1>
        </div>
        <div>
          <label htmlFor='fullName'>Tên</label>
          <input
            type='text'
            id='fullName'
            placeholder='Nhập tên'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='phone'>Số điện thoại</label>
          <input
            type='text'
            id='phone'
            placeholder='Nhập số điện thoại'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='address'>Địa chỉ</label>
          <input
            type='text'
            id='address'
            placeholder='Nhập địa chỉ'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='city'>Tỉnh/Thành phố</label>
          <input
            type='text'
            id='city'
            placeholder='Nhập tỉnh/thành phố'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor='country'>Quốc gia</label>
          <input
            type='text'
            id='country'
            placeholder='Nhập quốc gia'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
}
