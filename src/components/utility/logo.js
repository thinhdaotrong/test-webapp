import React from 'react';
import { Link } from 'react-router-dom';
import logoMins from '../../assets/images/hogar_logo1.svg';

export default ({ collapsed }) => (
  <div className="isoLogoWrapper">
    {collapsed ? (
      <div>
        <h3>
          <Link to="/">
            <img alt="logoWhite" src={logoMins} style={{ width: 70, height: 'auto', marginTop: 45}} />
          </Link>
        </h3>
      </div>
    ) : (
      <h3>
        <Link to="/"><img alt="logoWhiteBig" src={logoMins} style={{ width: 191, height: 61, marginTop: 38 }} /></Link>
      </h3>
    )}
  </div>
);

