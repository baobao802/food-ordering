import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, pages, page } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers({ pageNumber }));
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, pageNumber, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Bán có chắc muốn xoá tài khoản này?')) {
      dispatch(deleteUser(user._id));
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
      <h1 className='text-gray-900 text-lg md:text-3xl mb-3 font-medium'>
        Nhân viên
      </h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant='success'>
          Xoá tài khoản nhân viên thành công!
        </MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Tên
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Liên hệ
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Trạng thái
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Chức vụ
                      </th>
                      <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 h-10 w-10'>
                              <img
                                className='h-10 w-10 rounded-full'
                                src={user.image}
                                alt=''
                              />
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900'>
                                {user.name}
                              </div>
                              <div className='text-sm text-gray-500'>
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>
                            {user.address}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {user.phone}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            Đang hoạt động
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {user.isAdmin
                            ? 'Admin'
                            : user.isSeller
                            ? 'Nhân viên'
                            : 'Khách hàng'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <Link
                            to={`/user/${user._id}/edit`}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            Chỉnh sửa
                          </Link>
                          <span> / </span>
                          <Link
                            to='#'
                            className='text-indigo-600 hover:text-indigo-900'
                            onClick={() => deleteHandler(user)}
                          >
                            Xoá
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
              className='w-16 bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2.5 text-base border border-gray-200 rounded shadow'
              disabled={1 === page}
              onClick={() => navigate(`/userlist/pageNumber/${page - 1}`)}
            >
              Trước
            </button>
            <button
              className='w-16 bg-white hover:bg-gray-100 text-gray-900 font-medium py-1 px-2.5 text-base border border-gray-200 rounded shadow'
              disabled={pages === page}
              onClick={() => navigate(`/userlist/pageNumber/${page + 1}`)}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
