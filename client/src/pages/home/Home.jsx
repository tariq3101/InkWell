import { useEffect, useState } from 'react';
import './Home.css';
import Header from "../../components/header/Header";
import Posts from '../../components/posts/Posts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts${search}`);
        const sortedPosts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <> 
      <Header />
      <div className='home'>
        <Posts posts={posts} />
      </div>
    </>
  );
}
