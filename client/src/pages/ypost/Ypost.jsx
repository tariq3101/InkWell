import React, { useState, useContext, useEffect } from 'react';
import './Ypost.css';
import Posts from '../../components/posts/Posts'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Context } from "../../context/Context";

export default function Ypost() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Context);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        navigate('/login'); 
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/user/${user.username}`);
        const sortedPosts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setPosts(sortedPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [user, navigate]); 

  return (
    <> 
      <div className='your-posts'>
        <Posts posts={posts} />
      </div>
    </>
  );
}
