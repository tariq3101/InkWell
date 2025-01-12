import './Single.css'
import React from 'react'
import SinglePost from '../../components/singlePost/SinglePost'
import CommentSection from '../../components/comment/CommentSection'

const Single = () => {
  return (
    <div className='single'>
      {/* post */}
      <SinglePost />
      {/* <Sidebar /> */}
      <CommentSection />
    </div>
  )
}

export default Single
