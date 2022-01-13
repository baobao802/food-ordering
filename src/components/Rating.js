import React from 'react';
import '../index.css';

export default function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className='rating'>
      <span>
        <i
          className={
            rating >= 1
              ? 'fa fa-star'
              : rating >= 0.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fa fa-star'
              : rating >= 1.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fa fa-star'
              : rating >= 2.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fa fa-star'
              : rating >= 3.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fa fa-star'
              : rating >= 4.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      {caption ? (
        <span
          style={{
            color: 'rgb(119, 121, 140)',
            marginLeft: '10px',
            fontSize: '0.7em',
          }}
        >
          {caption}
        </span>
      ) : (
        <span
          style={{
            color: 'rgb(119, 121, 140)',
            marginLeft: '10px',
            fontSize: '0.7em',
          }}
        >
          {numReviews || 0 + ' reviews'}
        </span>
      )}
    </div>
  );
}
