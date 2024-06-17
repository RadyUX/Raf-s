import React from 'react'
import Category from '../components/Category';
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


function Home() {
  return (
    <>
    
      <div className='container flex mx-[400px]'>
        
        <div>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p>{post.content}</p>
              <span className="badge">{post.category}</span> | 
              <span className="likes">Likes: {post.likeCount}</span>
            </div>
          ))}
        </div>
        <div>
          <Category />
        </div>
      </div>
    </>
  )
}

export default Home