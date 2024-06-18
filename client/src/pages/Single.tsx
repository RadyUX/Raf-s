import React from 'react'
import DOMPurify from 'dompurify';

const posts = [
  {
    id: 1,
    title: "How to Start Gardening",
    content: "Gardening is a rewarding activity that can be started with just a few basic tools...",
    category: "Hobbies",
    likeCount: 15
  },
  {
    id: 2,
    title: "Best Practices for JavaScript",
    content: "JavaScript is a dynamic programming language used in web development...",
    category: "Programming",
    likeCount: 22
  },
  {
    id: 3,
    title: "Tips for Healthy Eating",
    content: "Healthy eating is not about strict dietary limitations, staying unrealistically thin...",
    category: "Health & Wellness",
    likeCount: 30
  },
];


function Single() {
  const post = posts[0];
  return (
    <div className="single flex mx-[400px] justify-around">
    <div className="content">
      <img src={`../upload/`} alt="" />
      <div className="user">
        
        <div className="info">
          
        </div>
        
      </div>
      <h1 className='text-4xl'>{post.title}</h1>
      <p>{post.category}</p>
      <div className='flex'>
      <p>{post.likeCount}</p>
      <button>Like</button>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      ></p>      </div>
    
  </div>
  )
}

export default Single