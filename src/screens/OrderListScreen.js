import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, pages, page } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
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
      <h1 className='text-gray-900 text-lg md:text-2xl'>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
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
                        User
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Date
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Total
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Paid
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Delivered
                      </th>
                      <th scope='col' class='relative px-6 py-3'>
                        <span class='sr-only'>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class='bg-white divide-y divide-gray-200'>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {order.user.name}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {order.totalPrice.toFixed(2)}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : 'No'}
                        </td>
                        <td class='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <Link
                            to={`/order/${order._id}`}
                            class='text-indigo-600 hover:text-indigo-900'
                          >
                            Edit
                          </Link>
                          <span> / </span>
                          <Link
                            to='#'
                            class='text-indigo-600 hover:text-indigo-900'
                            onClick={() => deleteHandler(order)}
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
              onClick={() => navigate(`/orderlist/pageNumber/${page - 1}`)}
            >
              Prev
            </button>
            <button
              class='bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2.5 text-base border border-gray-200 rounded shadow'
              disabled={pages === page}
              onClick={() => navigate(`/orderlist/pageNumber/${page + 1}`)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
