import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import './CommentSection.css';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResizableBox } from 'react-resizable';

const CommentSection = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/comments/${postId}`);
                const sortedComments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setComments(sortedComments);
                setLoading(false);
            } catch (err) {
                setError('Failed to load comments.');
                setLoading(false);
                toast.error('Failed to load comments.');
                console.error(err);
            }
        };
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            toast.warn('Comment cannot be empty.');
            return;
        }

        if (!user) {
            toast.warn('You must be logged in to comment.');
            return;
        }

        try {
            setSubmitting(true); 
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comments`, {
                postId,
                text: newComment,
                username: user.username,
                createdAt: new Date()
            });
            setComments((prevComments) => [response.data, ...prevComments]);
            setNewComment('');
            toast.success('Comment posted successfully!');
        } catch (err) {
            setError('Failed to post comment.');
            toast.error('Failed to post comment.');
            console.error(err);
        } finally {
            setSubmitting(false); 
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/comments/${commentId}`, {
                data: { username: user.username }
            });
            setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
            toast.success('Comment deleted successfully!');
        } catch (err) {
            setError('Failed to delete comment.');
            toast.error('Failed to delete comment.');
            console.error(err);
        }
    };

    const handleEdit = async (commentId, updatedText) => {
        if (!updatedText) return;

        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/comments/${commentId}`, {
                text: updatedText,
                username: user.username,
            });
            setComments((prevComments) => prevComments.map(comment =>
                comment._id === commentId ? response.data : comment
            ));
            toast.success('Comment edited successfully!');
        } catch (err) {
            setError('Failed to edit comment.');
            toast.error('Failed to edit comment.');
            console.error(err);
        }
    };

    return (
        <ResizableBox
            height={400}
            minConstraints={[300, 200]}
            maxConstraints={[1000, 800]}
            className="commentSection"
        >
            <h3>Comments</h3>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading comments...</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="commentForm">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            disabled={submitting} 
                        />
                        <button type="submit" disabled={submitting || !newComment.trim()}> 
                            {submitting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </form>
                    <div className="commentsList">
                        {comments.map(comment => (
                            <div key={comment._id} className="comment">
                                <p><strong>{comment.username}</strong> {new Date(comment.createdAt).toLocaleString()}</p>
                                <p>{comment.text}</p>
                                {user && user.username === comment.username && (
                                    <div className="commentActions">
                                        <button onClick={() => handleEdit(comment._id, prompt('Edit comment:', comment.text))}>Edit</button>
                                        <button onClick={() => handleDelete(comment._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
            <ToastContainer />
        </ResizableBox>
    );
};

export default CommentSection;
