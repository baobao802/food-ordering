import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="homepage-item">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h1 style={{color: 'rgb(13, 17, 54)', fontWeight: 600}}>{product.name}</h1>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="custom-row" style={{marginTop:'20px'}}>
          <div className="price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}
