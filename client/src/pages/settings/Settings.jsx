import React, { useState, useContext, useEffect } from 'react';
import './Settings.css';
import Luffy from '../../images/admin.png'; 
import axios from 'axios';
import { Context } from "../../context/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, dispatch } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        e.preventDefault();
        if (!username && !password && !file) {
            setIsLoading(false);
            return toast.error("Please update at least one field.");
        }
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username: username || user.username,
        };

        if (password) {
            updatedUser.password = password;
        }

        if (file) {
            const data = new FormData();
            data.append("file", file); // The actual file to be uploaded
            // data.append("upload_preset", "your_upload_preset"); // Cloudinary upload preset
      
            try {
              const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, data);
              const imageUrl = response.data.url; // Get the uploaded image URL from Cloudinary
      
              updatedUser.profilePic = imageUrl; // Save the URL directly in the `photo` field
      
              toast.success("Profile update successfully!");
              setIsLoading(false);
            } catch (err) {
              toast.error("Profile update failed!");
              setIsLoading(false);
              console.log(err);
            }
          }

        try {
            const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/${user._id}`, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            toast.success("Profile has been updated!");
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
            toast.error("Error updating profile.");
        }
    };

    const handleDelete = async () => {
        console.log(user._id)
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${user._id}`, { data: { userId: user._id } });
                dispatch({ type: "LOGOUT" });
                window.location.replace("/");
                toast.success("Account deleted successfully.");
            } catch (err) {
                console.log("Delete error: ", err);
                toast.error("Error deleting account.");
            }
        }
    };

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <span className="settingsDeleteTitle" onClick={handleDelete}>Delete account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img 
                            src={file ? URL.createObjectURL(file) : (user.profilePic ? user.profilePic : Luffy)} 
                            alt='' 
                        />
                        <label htmlFor='fileInput'>
                            <i className="settingsPPIcon fa-solid fa-user"></i>
                        </label>
                        <input 
                            type='file' 
                            id='fileInput' 
                            style={{ display: 'none' }} 
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>

                    <label>Username</label>
                    <input 
                        type='text' 
                        placeholder={user.username} 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                    {isAvailable === null ? null : (
                    <span className={`usernameCheck ${isAvailable ? "available" : "notAvailable"}`}>
                        {isAvailable ? "Username available" : "Username not available"}
                    </span>
                )}
                    <label>Email</label>
                    <input 
                        type='text' 
                        placeholder={user.email} 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        disabled 
                    />
                    <label>Password</label>
                    <input 
                        type='password' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <button className="settingsSubmit" type='submit'>
                        {isLoading ? 'Updating..' : 'Update'}
                    </button>
                </form>
            </div>
            {/* <Sidebar /> */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Settings;
