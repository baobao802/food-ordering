import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div
      style={{
        backgroundColor: '#f7f7f7',
        padding: '2vw 2vw 0 2vw',
        height: '100%',
      }}
    >
      <div className='row'>
        <h1 className='font-bold text-3xl py-2 font-medium'>Thống kê</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          <ul className='row summary flex gap-8 mb-8'>
            <li>
              <div className='summary-title bg-red-300'>
                <span>
                  <i className='fa fa-users' /> Người dùng
                </span>
              </div>
              <div className='summary-body'>{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className='summary-title bg-green-300'>
                <span>
                  <i className='fa fa-shopping-cart' /> Đơn hàng
                </span>
              </div>
              <div className='summary-body'>
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className='summary-title bg-purple-300'>
                <span>
                  <i className='fa fa-money' /> Doanh thu
                </span>
              </div>
              <div className='summary-body'>
                {summary.orders[0]
                  ? summary.orders[0].totalSales
                  : 0}
                  VNĐ
              </div>
            </li>
          </ul>
          <div className='mb-8'>
            <div>
              <h2 className='font-bold text-2xl font-medium mb-3'>Doanh thu</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>Không có doanh thu</MessageBox>
              ) : (
                <div className='rounded overflow-hidden'>
                  <Chart
                    width='100%'
                    height='500px'
                    chartType='AreaChart'
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Date', 'Sales'],
                      ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                    ]}
                  ></Chart>
                </div>
              )}
            </div>
          </div>
          <div className='mb-8'>
            <h2 className='font-bold text-2xl font-medium mb-3'>Doanh số theo phân loại</h2>
            {summary.fruitCategories.length === 0 ? (
              <MessageBox>Không có sản phẩm</MessageBox>
            ) : (
              <div className='rounded overflow-hidden'>
                <Chart
                  width='100%'
                  height='500px'
                  chartType='PieChart'
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Category', 'Products'],
                    ...summary.fruitCategories.map((x) => [x._id, x.count]),
                  ]}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
