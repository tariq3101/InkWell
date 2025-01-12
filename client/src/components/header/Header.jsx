import React from 'react';
import luffy from '../../images/header2.jpg';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className='headerTitleSm'>Write your dreams</span>
            <span className='headerTitleLg'>InkWell</span>
        </div>
        <img src={luffy} alt='Header' className='headerImg' />
    </div>
  );
};

export default Header;
