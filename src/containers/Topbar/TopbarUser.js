import React, { useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@hoa/components/uielements/popover';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import Auth from '../../components/Auth';
import userIcon from '../../assets/images/user.svg';
import createNotification from '@hoa/components/Notification';
import { logout } from 'hoa-redux/actions/auth';
import { Client4 } from 'hoa-redux/client';

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  const [isSwitch, setIsSwitch] = React.useState(false);
  const [image, setImage] = React.useState('');
  const {status} = useSelector(state => state.hoa.requests.auth.logout);
  const uploadImage = useSelector(state => state.hoa.requests.user.uploadImage);
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  useEffect(() => {
    const abortController = new AbortController()
    getImage();
    return () => abortController.abort() // clean up call
  }, [uploadImage]);
  
  async function getImage() {
    const image = await Client4.getProfileImage(Auth.getUserId());
    setImage(image);
  }
  
  if (isSwitch) {
    const tmp = path.split('/');
    let s = '';
    for (let i = 2; i < tmp.length; i++) {
      s += '/' + tmp[i];
    }
    return (
      <Redirect to={'/' + Auth.getRole() + s}/>
    )
  }

  if (status === 'success') {
    Auth.logout();
    return(
      <Redirect to='/signin'/>
    )
  }

  if (status === 'failure') {
    createNotification('error', 'Logout failure', '');
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link to={'/' + Auth.getRole() + '/profile'}>
        <p className="isoDropdownLink"> 
          {'Profile'} 
        </p>
      </Link>
      {
        Auth.getRoleName() === 'org_admin' &&
        <p style={{cursor: 'pointer'}}
          className="isoDropdownLink"
          onClick={() => {
              setIsSwitch(true);
              if (Auth.getRole() === 'admin') {
                Auth.setRole('client');
              } else {
                Auth.setRole('admin');
              }
          }}
        >
          {
            Auth.getRole() === 'admin' ? 'Switch to client' : 'Switch to admin'
          }
        </p>
      }
      <p style={{cursor: 'pointer'}}
        className="isoDropdownLink"
        onClick={() => {
          dispatch(logout())
        }}
      >
        {'Logout'}
      </p>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      arrowPointAtCenter
      content={content}
      onVisibleChange={handleVisibleChange}
      placement="bottomLeft"
      trigger="click"
      visible={visible}
    >
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <div 
          style={{
              width: 35, 
              height: 35, 
              backgroundColor: 'rgba(255, 255, 255)', 
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex', 
              // flexDirection: 'row'
              overflow: 'hidden'
          }}>
            {
              image && image.type && image.type.indexOf('image') != -1 ?
              <img
                src={URL.createObjectURL(image)}
                style={{ width: 35, height: 35}}
                alt='img'
              /> :
              <img alt="user" src={userIcon} style={{ width: 20, height: 20, opacity: '35%'}}/>
            }
          {/* <userIcon/> */}
          {/* <span className="userActivity online" /> */}
        </div>
        <p style={{fontSize: 14, marginLeft: 10}}>{Auth.getName()}</p>
      </div>
    </Popover>
  );
}
