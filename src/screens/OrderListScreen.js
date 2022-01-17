import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import Axios from 'axios';
import { useParams } from '../../node_modules/react-router/index';

export default function OrderListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
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

    dispatch(
      listOrders({ seller: sellerMode ? userInfo._id : '', pageNumber }),
    );
  }, [dispatch, sellerMode, successDelete, userInfo._id, navigate]);
  const deleteHandler = (order) => {
    if (window.confirm('Bạn có chắc muốn xoá đơn hàng?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  const handlePaid = async (order) => {
    // console.log(userInfo);
    if (window.confirm('Xác nhận rằng đơn hàng đã thanh toán?')) {
      try {
        console.log(userInfo);
        const response = await Axios.put(
          `/api/orders/${order._id}/pay`,
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          },
        );
        dispatch(
          listOrders({ seller: sellerMode ? userInfo._id : '', pageNumber }),
        );
        console.log(response);
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  const handleCancel = async (order) => {
    // console.log(userInfo);
    if (window.confirm('Bạn có muốn huỷ đơn hàng này?')) {
      try {
        const response = await Axios.put(
          `/api/orders/${order._id}/cancel`,
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          },
        );
        dispatch(
          listOrders({ seller: sellerMode ? userInfo._id : '', pageNumber }),
        );
        console.log(response);
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  const handleDelivery = async (order) => {
    if (window.confirm('Xác nhận rằng đơn hàng đã vận chuyển?')) {
      try {
        const response = await Axios.put(
          `/api/orders/${order._id}/deliver`,
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          },
        );
        dispatch(
          listOrders({ seller: sellerMode ? userInfo._id : '', pageNumber }),
        );
        console.log(response);
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        padding: '2rem',
        height: '100%',
      }}
    >
      <h1 className='text-gray-900 text-lg md:text-2xl'>Đơn hàng</h1>
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
                        Khách hàng
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Ngày
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Tổng tiền
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Đã vận chuyển
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Đã thanh toán
                      </th>
                      <th
                        scope='col'
                        class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Huỷ đơn hàng
                      </th>
                      {/* <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody class='bg-white divide-y divide-gray-200'>
                    {orders &&
                      orders.map((order) => {
                        return (
                          <tr key={order._id}>
                            <td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              {order.shippingAddress.fullName}
                            </td>
                            <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              {order.createdAt.substring(0, 10)}
                            </td>
                            <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              {order.totalPrice.toFixed(2)}
                            </td>
                            <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              <button
                                style={{
                                  backgroundColor: `${
                                    order.isDelivered ? '#01876c' : 'grey'
                                  }`,
                                  cursor: 'pointer',
                                  padding: '7px',
                                  borderRadius: '20px',
                                  color: 'white',
                                  fontWeight: 600,
                                }}
                                onClick={() => handleDelivery(order)}
                                disabled={order.isDelivered || order.isCanceled}
                              >
                                {order.isDelivered
                                  ? 'Đã vận chuyển'
                                  : 'Xác nhận vận chuyển'}
                              </button>
                            </td>
                            <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                              <button
                                style={{
                                  backgroundColor: `${
                                    order.isPaid ? '#01876c' : 'grey'
                                  }`,
                                  cursor: 'pointer',
                                  padding: '7px',
                                  borderRadius: '20px',
                                  color: 'white',
                                  fontWeight: 600,
                                }}
                                onClick={() => handlePaid(order)}
                                disabled={order.isPaid || order.isCanceled}
                              >
                                {order.isPaid
                                  ? 'Đã thanh toán'
                                  : 'Xác nhận thanh toán'}
                              </button>
                            </td>
                            <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              <button
                                style={{
                                  backgroundColor: `${
                                    order.isCanceled ? 'red' : 'grey'
                                  }`,
                                  cursor: 'pointer',
                                  padding: '7px',
                                  borderRadius: '20px',
                                  color: 'white',
                                  fontWeight: 600,
                                }}
                                onClick={() => handleCancel(order)}
                                disabled={
                                  order.isCanceled ||
                                  (order.isDelivered && order.isPaid)
                                }
                              >
                                {order.isCanceled
                                  ? 'Đã huỷ đơn hàng'
                                  : 'Huỷ đơn hàng'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='flex gap-1 mt-4 justify-end'>
            <button
              class='w-16 bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2.5 text-base border border-gray-200 rounded shadow'
              disabled={0 === page}
              onClick={() => navigate(`/orderlist/pageNumber/${page - 1}`)}
            >
              Trước
            </button>
            <button
              class='w-16 bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2.5 text-base border border-gray-200 rounded shadow'
              disabled={pages === page}
              onClick={() => navigate(`/orderlist/pageNumber/${page + 1}`)}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
