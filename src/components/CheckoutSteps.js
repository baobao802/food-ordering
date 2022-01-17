import React from 'react';
import '../index.css';

export default function CheckoutSteps(props) {
  return (
    <div className="custom-row checkout-steps" style={{paddingTop: '2rem'}}>
      <div className={props.step1 ? 'active' : ''}>Đăng nhập</div>
      <div className={props.step2 ? 'active' : ''}>Nhập địa chỉ</div>
      <div className={props.step3 ? 'active' : ''}>Chọn phương thức thanh toán</div>
      <div className={props.step4 ? 'active' : ''}>Đặt hàng</div>
    </div>
  );
}
