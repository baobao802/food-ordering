import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: userId } = params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.isAdmin ? 'admin' : user.isSeller ? 'seller' : 'customer');
    }
  }, [dispatch, navigate, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ _id: userId, name, email, ...roleMapped(role) });
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, ...roleMapped(role) }));
  };

  const roleMapped = (role) => {
    switch (role) {
      case 'admin':
        return {
          isAdmin: true,
          isSeller: false,
        };

      case 'seller':
        return {
          isAdmin: false,
          isSeller: true,
        };

      default:
        return {
          isAdmin: false,
          isSeller: false,
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        padding: '2vw 2vw 0 2vw',
        height: '100%',
      }}
    >
      <div>
        <h1 className='text-gray-900 text-lg md:text-3xl mb-3 font-medium'>
          Edit User {name}
        </h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div class='mt-5 max-w-2xl mx-auto'>
          <form onSubmit={submitHandler}>
            <div class='shadow overflow-hidden rounded-md'>
              <div class='px-4 py-5 bg-white sm:p-6'>
                <div class='grid grid-cols-6 gap-6'>
                  <div class='col-span-6 sm:col-span-3'>
                    <label
                      for='name'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      autocomplete='name'
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div class='col-span-6 sm:col-span-4'>
                    <label
                      for='email'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      value={email}
                      required
                      disabled
                    />
                  </div>

                  <div class='col-span-6 sm:col-span-3'>
                    <label
                      for='Role'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Role
                    </label>
                    <select
                      id='role'
                      name='role'
                      class='mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value='admin'>Admin</option>
                      <option value='seller'>Seller</option>
                      <option value='customer'>Customer</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  class='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
