import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="login-container">
      <img className='login-background' src='/images/fruitsbg.jpg'/>
      <form className="form login-form" onSubmit={submitHandler}>
        <div>
          <h1 style={{color: '#20a020', fontWeight: 600}}>Welcome to </h1>
          <img src="/images/logo.svg"/>
        </div>
        <div className="login-form-title__support">The best fruits you can have</div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email"><i style={{marginRight:'5px'}} class="fa fa-envelope-o" aria-hidden="true"></i>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password"><i style={{marginRight:'5px'}} class="fa fa-key" aria-hidden="true"></i>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button style={{fontWeight: 600}} className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            <Link style={{fontWeight: 500, color: '#cf6c6c'}} to={`/register?redirect=${redirect}`}>
              Create new account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
