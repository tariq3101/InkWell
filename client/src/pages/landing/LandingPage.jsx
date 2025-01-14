import React from 'react';
import './LandingPage.css';
import SideBar from '../../components/sidebar/SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useContext, useEffect } from 'react';

const LandingPage = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to InkWell</h1>
          <p className="hero-subtitle">
            Discover, write, and share your thoughts with the world.
          </p>
          <button className="cta-button"><Link to="/login" className='nav-link'>Get Started</Link></button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <SideBar />
          <h2>Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Create & Share</h3>
              <p>Write your stories and share them with a global audience.</p>
            </div>
            <div className="feature-card">
              <h3>Summarized Posts</h3>
              <p>Get quick summaries of your favorite posts with just a click.</p>
            </div>
            <div className="feature-card">
              <h3>Engage & Connect</h3>
              <p>Engage with other writers and build your creative network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 InkWell. All rights reserved.</p>
          <p>Follow us on social media for the latest updates.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
