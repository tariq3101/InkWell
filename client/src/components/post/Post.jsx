import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function Post({ post }) {

    return (
        <div className='post'>
            {post.photo && (
                <img 
                    src={post.photo} 
                    className='postImg' 
                    alt='Post' 
                />
            )}

            <div className="postInfo">
                <div className="postCats">
                    {post.categories.length > 0 ? (
                        post.categories.map((category, index) => (
                            <Link key={index} to={`/home/?cat=${category}`} className="postCatLink">
                                <span className='postCat'>{category}</span>
                            </Link>
                        ))
                    ) : (
                        <span className='postCat'>Uncategorized</span>
                    )}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>
                <div className="postMeta">
                    <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                    <span className="postAuthor">by {post.username}</span>
                </div>
            </div>
            <p className='postDesc' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} />
        </div>
    );
}
