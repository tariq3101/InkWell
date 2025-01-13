import React from 'react';
import './SideBar.css';
import logo from '../../images/logo.jpeg';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>
        <img src={logo} className='about-img' alt='Naruto Uzumaki' /> {/* Updated alt text */}
        <p>Welcome to our blogging website, where we believe in the power of words and ideas.
          Our platform is designed to provide a space for writers, thinkers, and creators to share
          their stories, knowledge, and insights with the world. Whether you're here to read, write,
          or just get inspired, we're excited to have you as part of our community. We focus on quality
          content, diverse perspectives, and creating a meaningful space for people to connect.</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          </a>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </a>
          <a href='https://www.pinterest.com' target='_blank' rel='noopener noreferrer'>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          </a>
          <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
            <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
