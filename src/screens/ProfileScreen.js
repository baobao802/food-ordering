import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          phone,
          address,
        }),
      );
    }
  };

  return (
    <div
      className='mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-10 sm:items-start sm:justify-center md:gap-16'
      style={{
        backgroundColor: '#f7f7f7',
        padding: '2vw 2vw 0 2vw',
        height: '100%',
      }}
    >
      <div className='w-full max-w-lg sm:max-w-xl md:max-w-4xl'>
        <div class='my-10 sm:my-12'>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant='danger'>{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant='success'>
                  Profile Updated Successfully
                </MessageBox>
              )}

              <div class='mt-5 max-w-2xl mx-auto'>
                <form onSubmit={submitHandler}>
                  <div class='shadow overflow-hidden rounded-md'>
                    <div className='px-4 py-5 bg-white sm:p-6'>
                      <div className='relative w-28 md:w-48 mx-auto'>
                        <img
                          className='rounded-full'
                          src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                          alt='Username'
                        />
                        <button className='absolute bottom-0 right-0 py-1 px-2 rounded text-xs opacity-60 font-bold sm:text-sm md:py-1.5 md:px-3 md:text-base transition-all hover:opacity-80'>
                          Edit
                        </button>
                      </div>
                    </div>
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
                            autocomplete='email'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='phone'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Phone
                          </label>
                          <input
                            type='text'
                            name='phone'
                            id='phone'
                            autocomplete='phone'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>

                        {/* <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='country'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Country
                          </label>
                          <select
                            id='country'
                            name='country'
                            autocomplete='country-name'
                            class='mt-1 block w-full py-2 px-3 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div> */}

                        <div class='col-span-6'>
                          <label
                            for='address'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Address
                          </label>
                          <input
                            type='text'
                            name='address'
                            id='address'
                            autocomplete='address'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>

                        {/* if account is not user then show this field else hide this field */}
                        {(user.isAdmin || user.isSeller) && (
                          <div class='col-span-6 sm:col-span-6 lg:col-span-2'>
                            <label
                              for='role'
                              class='block text-sm font-medium text-gray-700'
                            >
                              Role
                            </label>
                            <input
                              type='text'
                              name='role'
                              id='role'
                              value={user.isAdmin ? 'Admin' : 'Seller'}
                              class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                              disabled
                            />
                          </div>
                        )}

                        <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='password'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Password
                          </label>
                          <input
                            type='password'
                            name='password'
                            id='password'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='confirm-password'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Confirm Password
                          </label>
                          <input
                            type='password'
                            name='confirmPassword'
                            id='confirm-password'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
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
            </>
          )}
        </div>
        {/* <form className='form' onSubmit={submitHandler}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant='danger'>{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant='success'>
                  Profile Updated Successfully
                </MessageBox>
              )}
              <h2 className='font-bold text-xl sm:text-2xl md:text-3xl'>
                Profile
              </h2>
              <div>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  id='confirmPassword'
                  type='password'
                  placeholder='Enter confirm password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              {user.isSeller && (
                <>
                  <h2>Seller</h2>
                  <div>
                    <label htmlFor='sellerName'>Seller Name</label>
                    <input
                      id='sellerName'
                      type='text'
                      placeholder='Enter Seller Name'
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor='sellerLogo'>Seller Logo</label>
                    <input
                      id='sellerLogo'
                      type='text'
                      placeholder='Enter Seller Logo'
                      value={sellerLogo}
                      onChange={(e) => setSellerLogo(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor='sellerDescription'>
                      Seller Description
                    </label>
                    <input
                      id='sellerDescription'
                      type='text'
                      placeholder='Enter Seller Description'
                      value={sellerDescription}
                      onChange={(e) => setSellerDescription(e.target.value)}
                    ></input>
                  </div>
                </>
              )}
              <div>
                <button
                  class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit text-sm md:text-base ml-auto'
                  type='submit'
                >
                  Update
                </button>
              </div>
            </>
          )}
        </form> */}
      </div>
    </div>
  );
}
