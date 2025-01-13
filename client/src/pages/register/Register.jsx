import './Register.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is your favorite book?",
    "What city were you born in?",
    "What is the name of your elementary school?"
];

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState(securityQuestions[0]);
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [error, setError] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);

    const checkUsernameAvailability = async (username) => {
        if (!username) return;
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/check-username/${username}`);
            setIsAvailable(res.data.available);
        } catch (err) {
            console.error("Error checking username availability", err);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            checkUsernameAvailability(username);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        if (!username || !email || !password || !securityAnswer) {
            toast.error('All fields are required!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
            return;
        }

        if (!isAvailable) {
            toast.error('Username is not available!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
            return;
        }
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                username,
                email,
                password,
                securityQuestion,
                securityAnswer,
            });
            toast.success('Registration successful! Redirecting to login...', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
            res.data && setTimeout(() => window.location.replace("/login"), 3000);
        } catch (err) {
            setError(true);
            toast.error('User already exists!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    return (
        <div className='register'>
            <h1 className="registerTitle">Register</h1>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type='text'
                    className={`registerInput ${error ? "error" : ""}`}
                    placeholder='Enter your username'
                    onChange={e => setUsername(e.target.value)}
                />
                {isAvailable === null ? null : (
                    <span className={`usernameCheck ${isAvailable ? "available" : "notAvailable"}`}>
                        {isAvailable ? "Username available" : "Username not available"}
                    </span>
                )}
                
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type='email'
                    className={`registerInput ${error ? "error" : ""}`}
                    placeholder='Enter your email'
                    onChange={e => setEmail(e.target.value)}
                />
                
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type='password'
                    className={`registerInput ${error ? "error" : ""}`}
                    placeholder='Enter your password'
                    onChange={e => setPassword(e.target.value)}
                />
                
                <label htmlFor="securityQuestion">Security Question</label>
                <select
                    id="securityQuestion"
                    className="registerInput"
                    value={securityQuestion}
                    onChange={e => setSecurityQuestion(e.target.value)}
                >
                    {securityQuestions.map((question, index) => (
                        <option key={index} value={question}>{question}</option>
                    ))}
                </select>
                
                <label htmlFor="securityAnswer">Answer</label>
                <input
                    id="securityAnswer"
                    type='text'
                    className={`registerInput ${error ? "error" : ""}`}
                    placeholder='Your answer'
                    onChange={e => setSecurityAnswer(e.target.value)}
                />
                
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link to='/login' className='link'>Login</Link>
            </button>
            <ToastContainer />
        </div>
    );
};

export default Register;
