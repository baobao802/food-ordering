import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';

export default function ProductListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber }),
    );
  }, [
    createdProduct,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        padding: '2vw 2vw 0 2vw',
        height: '100%',
      }}
    >
      <div className='row'>
        <h1 className='text-gray-900 text-lg md:text-2xl'>Products</h1>
        <div className='text-right'>
          <button
            type='button'
            className='primary'
            style={{ marginLeft: 'auto', marginBottom: '1rem' }}
            onClick={createHandler}
          >
            Create Product
          </button>
        </div>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div class='flex flex-col'>
          <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div class='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div class='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table class='min-w-full divide-y divide-gray-200'>
                  <thead class='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Category
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Brand
                      </th>
                      <th scope='col' class='relative px-6 py-3'>
                        <span class='sr-only'>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class='bg-white divide-y divide-gray-200'>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td class='px-6 py-4 whitespace-nowrap'>
                          <div class='flex items-center'>
                            <div class='flex-shrink-0 h-10 w-10'>
                              <img
                                class='h-10 w-10 rounded-sm'
                                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                alt=''
                              />
                            </div>
                            <div class='ml-4'>
                              <div class='text-sm font-medium text-gray-900'>
                                {product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {product.price}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {product.category}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {product.brand}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <Link
                            to={`/product/${product._id}/edit`}
                            class='text-indigo-600 hover:text-indigo-900'
                          >
                            Edit
                          </Link>
                          <span> / </span>
                          <Link
                            to='#'
                            class='text-indigo-600 hover:text-indigo-900'
                            onClick={() => deleteHandler(product)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='flex gap-1 mt-4 justify-end'>
            <button
              class='bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2.5 text-base border border-gray-200 rounded shadow'
              disabled={0 === page}
              onClick={() => navigate(`/productlist/pageNumber/${page - 1}`)}
            >
              Prev
            </button>
            <button
              class='bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2.5 text-base border border-gray-200 rounded shadow'
              disabled={pages === page}
              onClick={() => navigate(`/productlist/pageNumber/${page + 1}`)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
