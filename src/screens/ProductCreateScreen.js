import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductCreateScreen(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      navigate('/productlist');
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      }),
    );
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
          Create a New Product
        </h1>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}
      {
        <div class='mt-5 max-w-2xl mx-auto'>
          <form onSubmit={submitHandler}>
            <div class='shadow overflow-hidden rounded-md'>
              <div class='px-4 py-5 bg-white sm:p-6'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  {image && (
                    <div className='relative w-28 h-28 md:w-48 md:h-48 mx-auto'>
                      <img
                        className='rounded w-full h-full'
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
                          Edit
                        </label>
                      </button>
                    </div>
                  )}
                </div>

                <div class='grid grid-cols-6 gap-6 mb-6'>
                  {!image && (
                    <div class='col-span-6 sm:col-span-2'>
                      <label
                        for='image'
                        class='block text-sm font-medium text-gray-700'
                      >
                        Image
                      </label>
                      <input
                        type='file'
                        name='image'
                        id='image'
                        class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                      />
                    </div>
                  )}
                </div>

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
                      for='price'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Price
                    </label>
                    <input
                      type='number'
                      name='price'
                      id='price'
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div class='col-span-6 sm:col-span-3'>
                    <label
                      for='category'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Category
                    </label>
                    <input
                      type='text'
                      name='category'
                      id='category'
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>

                  <div class='col-span-6 sm:col-span-3'>
                    <label
                      for='brand'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Brand
                    </label>
                    <input
                      type='text'
                      name='brand'
                      id='brand'
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                  </div>

                  <div class='col-span-6 sm:col-span-2'>
                    <label
                      for='countInStock'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Count In Stock
                    </label>
                    <input
                      type='number'
                      name='countInStock'
                      id='countInStock'
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    />
                  </div>

                  <div class='col-span-6 sm:col-span-4'>
                    <label
                      for='description'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Description
                    </label>
                    <textarea
                      name='description'
                      id='description'
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-32'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
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
      }
    </div>
  );
}
