import './SinglePost.css';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
];

const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [summary, setSummary] = useState('');
    const [isSummarized, setIsSummarized] = useState(false);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const { user } = useContext(Context);

    const BASE_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${path}`);
                const data = res.data;
                setPost(data);
                setTitle(data.title);
                setDesc(data.desc);
                setLikeCount(data.likeCount);
                if (user) setLiked(data.likes.includes(user.username));
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch post data.");
            }
        };
        getPost();
    }, [path, user, BASE_URL]);

    const handleDelete = async () => {
        if (!user) return;
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}`, {
                data: { username: user.username },
            });
            toast.success("Post deleted successfully!");
            window.location.replace("/");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete post.");
        }
    };

    const handleUpdate = async () => {
        if (!user) return;
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
            toast.success("Post updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update post.");
        }
    };

    const handleImage = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return; // If no file is selected, return early.

        const data = new FormData();
        data.append("file", selectedFile);

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, data);
            const photo = res.data.url;

            await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}`, {
                username: user.username,
                photo,
            });

            toast.success("Image updated successfully!");
            window.location.reload();
            e.target.value = ""; // Reset file input after successful upload.
        } catch (err) {
            console.error(err);
            toast.error("Image update failed!");
            e.target.value = ""; // Reset file input even if upload fails.
        }
    };

    const handleLike = async () => {
        if (!user) {
            toast.warn("You must be logged in to like this post.");
            return;
        }

        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}/like`, {
                username: user.username,
            });
            setLikeCount(res.data.likeCount);
            setLiked(!liked);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update like status.");
        }
    };

    const handleSummarize = async () => {
        setLoadingSummary(true);
        const prompt = `${post?.desc || ''}\n\nPlease summarize the above content in 2-3 sentences and highlight keywords.`;

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/summarize`, { text: prompt });
            setSummary(res.data.generatedText.replace(/[*_~`]+/g, ''));
            setIsSummarized(true);
            toast.success("Summarization completed!");
        } catch (err) {
            console.error("Error summarizing post:", err);
            toast.error("Failed to summarize the post.");
        } finally {
            setLoadingSummary(false);
        }
    };

    const showLikes = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}/likes`);
            const likeDetails = res.data.map(like => `
                <div class="likeUser">
                    <img src="${like.profilePic || 'default-profile-pic.jpg'}" alt="${like.username}'s profile picture" class="likeUserImg"/>
                    <span>${like.username}</span>
                </div>
            `).join('');
    
            const width = 300;
            const height = 400;
            const left = (window.innerWidth - width) / 2 + window.screenX;
            const top = (window.innerHeight - height) / 2 + window.screenY;
    
            const likeWindow = window.open(
                "", 
                "Likes", 
                `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=yes`
            );
            
            likeWindow.document.write(`
                <html>
                    <head>
                        <title>Likes</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 10px; }
                            .likeUser { display: flex; align-items: center; margin-bottom: 10px; }
                            .likeUserImg { width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                object-fit: cover;
                                cursor: pointer;
                                margin-right: 10px; }
                        </style>
                    </head>
                    <body>
                        <h2>Likes</h2>
                        ${likeDetails}
                    </body>
                </html>
            `);
            likeWindow.document.title = "Likes";
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch like details.");
        }
    };
    
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post?.photo && <img src={post.photo} className="singlePostImg" alt="Post" />}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link>
                    </span>
                    <span className="singlePostDate">{new Date(post?.createdAt).toDateString()}</span>
                    <span className="singlePostLikes">
                        <button className="likeButton" onClick={handleLike}>
                            <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
                            {likeCount}
                        </button>
                    </span>
                    <button className="showLikesButton" onClick={showLikes}>
                        Show Likes
                    </button>
                </div>

                <div className="singlePostTitleSection">
                    {updateMode ? (
                        <input
                            type="text"
                            value={title}
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <h1 className="singlePostTitle">
                            {title}
                            {user && post.username === user.username && (
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                                    <label htmlFor="updateImageInput" className="singlePostIcon">
                                        <i className="singlePostIcon fa-solid fa-image"></i>
                                    </label>
                                    <input
                                        type="file"
                                        id="updateImageInput"
                                        className="hiddenInput"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleImage}
                                    />
                                </div>
                            )}
                        </h1>
                    )}
                </div>

                {updateMode ? (
                    <ReactQuill
                        value={desc}
                        onChange={setDesc}
                        modules={{ toolbar: toolbarOptions }}
                        className="singlePostEditor"
                    />
                ) : (
                    <div className="singlePostDesc" dangerouslySetInnerHTML={{ __html: desc }}></div>
                )}

                <button className="summarizeButton" onClick={handleSummarize} disabled={loadingSummary}>
                    {loadingSummary ? "Summarizing..." : isSummarized ? "Resummarize" : "Summarize"}
                </button>

                {isSummarized && (
                    <div className="summarizedPost">
                        <h3>Summarized Post:</h3>
                        <p>{summary}</p>
                    </div>
                )}

                {updateMode && (
                    <div className="singlePostEditButtons">
                        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                        <button className="singlePostButton" onClick={() => setUpdateMode(false)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePost;