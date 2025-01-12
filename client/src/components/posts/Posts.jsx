import React from 'react';
import './Posts.css';
import Post from '../post/Post';

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  );
}