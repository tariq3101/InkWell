import React from 'react';
import './AboutUs.css';
import SideBar from '../../components/sidebar/SideBar';

const AboutUs = () => {
  return (
    <div className='about'>
    {/* <div className="aboutUs">
      <h1 className="aboutUsTitle">About Us</h1>
      <p className="aboutUsDesc">
        Welcome to our blogging website, where we believe in the power of words and ideas. 
        Our platform is designed to provide a space for writers, thinkers, and creators to share 
        their stories, knowledge, and insights with the world. Whether you're here to read, write, 
        or just get inspired, we're excited to have you as part of our community. We focus on quality 
        content, diverse perspectives, and creating a meaningful space for people to connect.
      </p>
      <p className="aboutUsDesc">
        Our team consists of passionate individuals who are dedicated to making this platform the best it can be. 
        We strive to create an inclusive and supportive environment for all our users.
      </p>
    </div> */}
    <SideBar />
    </div>
  );
}

export default AboutUs;
