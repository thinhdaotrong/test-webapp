import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { useLocation, Redirect } from 'react-router-dom';
import appActions from '@hoa/redux/app/actions';
import TopbarNotification from './TopbarNotification';
import TopbarMessage from './TopbarMessage';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
// import TopbarAddtoCart from './TopbarAddToCart';
import TopbarWrapper from './Topbar.styles';
import Auth from '../../components/Auth';
const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const [, setSelectedItem] = React.useState('');
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer, current } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: 'black',
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  const isAdmin = Auth.getRoleName() === 'org_admin' ? true : false;

  const key = useLocation().pathname;
  // const error = useSelector(state => state.Cias.error.error);
  // if (error) {
  //   Auth.logout();
  //   dispatch(logout())
  //   return (
  //     <Redirect to="/signin"/>
  //   )
  // }
  let title = '';

  // if (key === '/dashboard') {
  //   title = 'das';
  // } else if (key === '/dashboard/category/branch') {
  //   title = 'Quản lý chi nhánh';
  // } else if (key === '/dashboard/category/shop') {
  //   title = 'Quản lý quầy';
  // } else if (key === '/dashboard/category/service') {
  //   title = 'Quản lý dịch vụ';
  // } else if (key === '/dashboard/importdata') {
  //   title = 'Báo cáo / Nhập dữ liệu';
  // } else if (key === '/dashboard/importtarget') {
  //   title = 'Báo cáo / Nhập chỉ tiêu';
  // } else if (key === '/dashboard/profile') {
  //   title = 'Thông tin người dùng';
  // } else if (key === '/dashboard/editprofile') {
  //   title = 'Chỉnh sửa thông tin';
  // } else if (key === '/dashboard/resetpw') {
  //   title = 'Đổi mật khẩu';
  // } else if (key === '/dashboard/account') {
  //   title = "Quản lý tài khoản";
  // } else if (key === '/dashboard/import') {
  //   title = "Nhập dữ liệu"
  // }
  
  return (
    <TopbarWrapper>
      <Header
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
        style={styling}
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            onClick={handleToggle}
            style={{ color: '#fff' }}
          />
          <p style={{fontSize: 18, color: '#fff', marginLeft: 18}}>{title}</p>
        </div>

        <ul className="isoRight">
          {/* <li className="isoSearch">
            <TopbarSearch />
          </li> */}

          <li
            className="isoNotify"
            onClick={() => setSelectedItem('notification')}
          >
            <TopbarNotification />
          </li>
          {
            isAdmin && 
            <li className="isoMsg" onClick={() => setSelectedItem('message')}>
              <TopbarMessage />
            </li>
          }
          {/* <li className="isoCart" onClick={() => setSelectedItem('addToCart')}>
            <TopbarAddtoCart />
          </li> */}

          <li className="isoUser" onClick={() => setSelectedItem('user')}>
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
