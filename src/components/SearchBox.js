import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form class="search" onSubmit={submitHandler}>
       <i className="fa fa-search"></i>
      <input 
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
          class="nav-search-input" 
          placeholder="Search your products from here"/>
    </form>
  );
}
