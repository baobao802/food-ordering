import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      navigate('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
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
          Edit Product {name}
        </h1>
      </div>
      {loadingUpdate && <LoadingBox></LoadingBox>}
      {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div class='mt-5 max-w-2xl mx-auto'>
          <form onSubmit={submitHandler}>
            <div class='shadow overflow-hidden rounded-md'>
              <div class='px-4 py-5 bg-white sm:p-6'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='relative w-28 h-28 md:w-48 md:h-48 mx-auto'>
                    {image && (
                      <img
                        className='rounded w-full h-full'
                        src={
                          typeof image === 'object'
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt={name}
                      />
                    )}
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
                      type='text'
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
                      class='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
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
        // <>
        //   <div>
        //     <label htmlFor='name'>Name</label>
        //     <input
        //       id='name'
        //       type='text'
        //       placeholder='Enter name'
        //       value={name}
        //       onChange={(e) => setName(e.target.value)}
        //     ></input>
        //   </div>
        //   <div>
        //     <label htmlFor='price'>Price</label>
        //     <input
        //       id='price'
        //       type='text'
        //       placeholder='Enter price'
        //       value={price}
        //       onChange={(e) => setPrice(e.target.value)}
        //     ></input>
        //   </div>
        //   <div>
        //     <label htmlFor='image'>Image</label>
        //     <input
        //       id='image'
        //       type='text'
        //       placeholder='Enter image'
        //       value={image}
        //       onChange={(e) => setImage(e.target.value)}
        //     ></input>
        //   </div>
        //   <div>
        //     <label htmlFor='imageFile'>Image File</label>
        //     <input
        //       type='file'
        //       id='imageFile'
        //       label='Choose Image'
        //       onChange={uploadFileHandler}
        //     ></input>
        //     {loadingUpload && <LoadingBox></LoadingBox>}
        //     {errorUpload && (
        //       <MessageBox variant='danger'>{errorUpload}</MessageBox>
        //     )}
        //   </div>
        //   <div>
        //     <label htmlFor='category'>Category</label>
        //     <input
        //       id='category'
        //       type='text'
        //       placeholder='Enter category'
        //       value={category}
        //       onChange={(e) => setCategory(e.target.value)}
        //     ></input>
        //   </div>
        //   <div>
        //     <label htmlFor='brand'>Brand</label>
        //     <input
        //       id='brand'
        //       type='text'
        //       placeholder='Enter brand'
        //       value={brand}
        //       onChange={(e) => setBrand(e.target.value)}
        //     ></input>
        //   </div>
        //   <div>
        //     <label htmlFor='countInStock'>Count In Stock</label>
        //     <input
        //       id='countInStock'
        //       type='text'
        //       placeholder='Enter countInStock'
        //       value={countInStock}
        //       onChange={(e) => setCountInStock(e.target.value)}
        //     ></input>
        //   </div>
        //   <div>
        //     <label htmlFor='description'>Description</label>
        //     <textarea
        //       id='description'
        //       rows='3'
        //       type='text'
        //       placeholder='Enter description'
        //       value={description}
        //       onChange={(e) => setDescription(e.target.value)}
        //     ></textarea>
        //   </div>
        //   <div>
        //     <label></label>
        //     <button className='primary' type='submit'>
        //       Update
        //     </button>
        //   </div>
        // </>
      )}
    </div>
  );
}
