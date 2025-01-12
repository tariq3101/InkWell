import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostSlider.css'; 

const PostSlider = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts?limit=4'); 
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='postSlider'>
      {posts.length > 0 ? (
        <div className='slider'>
          {posts.map((post) => (
            <div key={post._id} className='slide'>
              <img src={`http://localhost:5000/images/${post.photo}`} alt={post.title} className='slideImg' />
              <div className='slideInfo'>
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostSlider;
