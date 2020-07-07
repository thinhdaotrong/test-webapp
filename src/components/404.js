import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Image from '../assets/images/404.jpg';
import NotfoundStyle from '../assets/styles/404Style';

export default function() {
  return (
      <NotfoundStyle>
          <img src={Image} className='img' alt='img'/>   
          <p style={{fontSize: 17, color: '#000'}}>
              {' Page Not Found'}
          </p>
          <Link to="/admin/dashboard">
              <Button
                type='primary'
                style={{height: 42, marginTop: 36}}
              >
                  {'Back to home'}
              </Button>
          </Link>
      </NotfoundStyle>
  );
}
