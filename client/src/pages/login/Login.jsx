import './Login.css';
import { Context } from "../../context/Context";
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); 
    const [isForgotPassword, setIsForgotPassword] = useState(false); 
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isForgotPassword) {
            handleForgotPasswordSubmit(); 
        } else {
            handleLoginSubmit();
        }
    };

    const handleLoginSubmit = async () => {
        dispatch({ type: "LOGIN_START" });
        setError(null);

        const username = userRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            dispatch({ type: "LOGIN_FAILURE" });
            toast.error('Please fill out both fields!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { username, password });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            toast.success('Login successful!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
        } catch (err) {
            console.error('Login error:', err);
            dispatch({ type: "LOGIN_FAILURE" });
            toast.error('Invalid credentials!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    const handleForgotPasswordSubmit = async () => {
        const username = userRef.current.value;
        if (!username || !securityAnswer || !newPassword) {
            toast.error('Please fill out all fields for password reset!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
            return;
        }
        console.log({
            username: userRef.current.value,
            securityAnswer: securityAnswer,
        });
        

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password/verify-answer`, 
            {
                username,
                securityAnswer
            });

            if (res.data.message === "Security answer verified.") {
                await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password/reset`, 
                { 
                    username, 
                    newPassword 
                });
                toast.success('Password reset successful! Please login with your new password.', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
                setIsForgotPassword(false); 
            }
        } catch (err) {
            console.error('Password reset error:', err);
            toast.error('Invalid security answer!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);  
    };

    const handleForgotPasswordClick = async () => {
        setIsForgotPassword(true); 
        
        const username = userRef.current.value;
        if (username) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/get-security-question`, { username });
                setSecurityQuestion(res.data.securityQuestion);
            } catch (err) {
                console.error('Error fetching security question:', err);
                toast.error('Error fetching security question!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
        }
    };

    return (
        <div className='login'>
            <h1 className="loginTitle">{isForgotPassword ? "Forgot Password" : "Login"}</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type='text'
                    className={`loginInput ${error ? "error" : ""}`}
                    placeholder='Enter your username'
                    ref={userRef}
                />

                {!isForgotPassword && (
                    <>
                        <label htmlFor="password">Password</label>
                        <div className="passwordContainer">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}  
                                className={`loginInput ${error ? "error" : ""}`}
                                placeholder='Enter your password'
                                ref={passwordRef}
                            />
                            <span className="togglePassword" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </>
                )}

                {isForgotPassword && (
                    <>
                        <label htmlFor="securityQuestion">Security Question</label>
                        <input
                            id="securityQuestion"
                            type='text'
                            className="loginInput"
                            value={securityQuestion}
                            readOnly
                        />

                        <label htmlFor="securityAnswer">Security Answer</label>
                        <input
                            id="securityAnswer"
                            type='text'
                            className="loginInput"
                            placeholder='Enter your answer'
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                        />

                        <label htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            type='password'
                            className="loginInput"
                            placeholder='Enter new password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </>
                )}

                <button className="loginButton" type="submit" disabled={isFetching}>
                    {isFetching ? "Processing..." : (isForgotPassword ? "Reset Password" : "Login")}
                </button>
            </form>

            {!isForgotPassword && (
                <>
                    <button className="forgotPasswordButton" onClick={handleForgotPasswordClick}>
                        Forgot Password?
                    </button>
                    <button className="loginRegisterButton">
                        <Link to='/register' className='link'>Register</Link>
                    </button>
                </>
            )}

            <ToastContainer />
        </div>
    );
};

export default Login;
