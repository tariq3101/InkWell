import React from 'react';
import "./TopBar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import logo from '../../images/logo.jpeg';

const TopBar = () => {
    const { user, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            dispatch({ type: "LOGOUT" });
            navigate('/')
        }
    };

    const handleYourPostsClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/your-posts');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt='Logo' className='logo' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {user ? (<ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link to="/home" className="nav-link">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/write" className="nav-link">WRITE</Link>
                        </li>
                        <li className="nav-item" onClick={handleYourPostsClick}>
                            <span className="nav-link" style={{ cursor: 'pointer' }}>YOUR POSTS</span>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">ABOUT</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">CONTACT</Link>
                        </li>
                        <li className="nav-item" onClick={handleLogout}>
                            {user && <span className="nav-link" style={{ cursor: 'pointer' }}>LOGOUT</span>}
                        </li>
                    </ul>)
                        : (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/write" className="nav-link">WRITE</Link>
                            </li>
                            <li className="nav-item" onClick={handleYourPostsClick}>
                                <span className="nav-link" style={{ cursor: 'pointer' }}>YOUR POSTS</span>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">ABOUT</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">CONTACT</Link>
                            </li>
                            <li className="nav-item" onClick={handleLogout}>
                                {user && <span className="nav-link" style={{ cursor: 'pointer' }}>LOGOUT</span>}
                            </li>
                        </ul>)}


                    <div className="d-flex">
                        {user ? (
                            <div className="user d-flex align-items-center">
                                <span className='user-name me-2'>Hello, {user.username}</span>
                                <Link to="/settings">
                                    <img src={user.profilePic} alt='' className='topImg' />
                                </Link>
                            </div>
                        ) : (
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    <Link to='/login' className='nav-link'>LOGIN</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/register' className='nav-link'>REGISTER</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default TopBar;
