import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function SearchBox() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    // <form className="search" onSubmit={submitHandler}>
    //   <div className="row">
    //     <input
    //       type="text"
    //       name="q"
    //       id="q"
    //       onChange={(e) => setName(e.target.value)}
    //     ></input>
    //     <button className="primary" type="submit">
    //       <i className="fa fa-search"></i>
    //     </button>
    //   </div>
    // </form>
    <form className='search' onSubmit={submitHandler}>
      <i className='fa fa-search'></i>
      <input
        type='text'
        name='q'
        id='q'
        onChange={(e) => setName(e.target.value)}
        className='nav-search-input'
        placeholder='Search your products from here'
      />
    </form>
  );
}
