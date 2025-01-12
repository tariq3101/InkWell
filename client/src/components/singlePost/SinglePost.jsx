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
import LikesModal from './LikesModal';

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
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [summary, setSummary] = useState('');
    const [isSummarized, setIsSummarized] = useState(false);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const { user } = useContext(Context);
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [file, setFile] = useState(null);

    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`/posts/${path}`);
                const data = res.data;
                setPost(data);
                setTitle(data.title);
                setDesc(data.desc);
                setLikeCount(data.likeCount);
                setLikes(data.likes || []);
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
            await axios.delete(`/posts/${post._id}`, {
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
            await axios.patch(`/posts/${post._id}`, {
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
            const res = await axios.post(`/upload`, data);
            const photo = res.data.url;

            await axios.patch(`/posts/${post._id}`, {
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
            const res = await axios.put(`/posts/${post._id}/like`, {
                username: user.username,
            });
            setLikes(res.data.likes);
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
            const res = await axios.post(`/summarize`, { text: prompt });
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

    const showLikes = () => {
        alert('Likes: \n' + likes.join('\n'));
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
                    {showLikesModal && <LikesModal users={likes} onClose={() => setShowLikesModal(false)} />}
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
                                        style={{display: "none"}}
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
