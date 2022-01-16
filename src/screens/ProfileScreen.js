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
  const [image, setImage] = useState(null);

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
      setImage(user.image);
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
          image,
        }),
      );
    }
  };

  return (
    <div
      className='mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-10 sm:items-start sm:justify-center md:gap-16'
      style={{
        backgroundColor: '#f7f7f7',
        padding: '2rem',
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
                  Cập nhật hồ sơ thành công!
                </MessageBox>
              )}

              <div class='mt-5 max-w-2xl mx-auto'>
                <form onSubmit={submitHandler}>
                  <div class='shadow overflow-hidden rounded-md'>
                    <div className='px-4 py-5 bg-white sm:p-6'>
                      {image && (
                        <div className='relative w-28 h-28 md:w-48 md:h-48 mx-auto'>
                          <img
                            className='rounded-full w-full h-full'
                            src={
                              typeof image === 'object'
                                ? URL.createObjectURL(image)
                                : image
                            }
                            alt={name}
                          />
                          <button
                            type='button'
                            className='absolute bottom-0 right-0 rounded bg-gray-100 text-xs opacity-50 font-bold sm:text-sm md:text-base transition-all hover:opacity-80'
                          >
                            <label
                              htmlFor='image'
                              className='py-1 px-2 md:py-1.5 md:px-3 cursor-pointer'
                            >
                              <input
                                type='file'
                                name='image'
                                id='image'
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                              Sửa
                            </label>
                          </button>
                        </div>
                      )}
                    </div>
                    <div class='px-4 py-5 bg-white sm:p-6'>
                      <div class='grid grid-cols-6 gap-6'>
                        <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='name'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Tên
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
                            autocomplete='email'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='phone'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Số điện thoại
                          </label>
                          <input
                            type='text'
                            name='phone'
                            id='phone'
                            autocomplete='phone'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
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
                            Địa chỉ
                          </label>
                          <input
                            type='text'
                            name='address'
                            id='address'
                            autocomplete='address'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>

                        <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='password'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Mật khẩu
                          </label>
                          <input
                            type='password'
                            name='password'
                            id='password'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div class='col-span-6 sm:col-span-3'>
                          <label
                            for='confirm-password'
                            class='block text-sm font-medium text-gray-700'
                          >
                            Nhập lại mật khẩu
                          </label>
                          <input
                            type='password'
                            name='confirmPassword'
                            id='confirm-password'
                            class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>

                        {(user.isAdmin || user.isSeller) && (
                          <div class='col-span-6 sm:col-span-6 lg:col-span-2'>
                            <label
                              for='role'
                              class='block text-sm font-medium text-gray-700'
                            >
                              Quyền
                            </label>
                            <input
                              type='text'
                              name='role'
                              id='role'
                              value={user.isAdmin ? 'Admin' : 'Seller'}
                              class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                              disabled
                              readOnly
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div class='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                      <button
                        type='submit'
                        class='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
