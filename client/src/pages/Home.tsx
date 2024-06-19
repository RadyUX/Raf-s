import React from 'react'
import Category from '../components/Category';
import { Link } from 'react-router-dom';
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
      <div className='flex justify-around mx-4'>
        <div className='w-3/4'>
          <h1 className='text-[#6CCFF6] text-3xl'>Derniers posts</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
            {posts.map((post) => (
              <div className="p-4 rounded-lg post" key={post.id}>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1 className="text-xl font-bold">{post.title}</h1>
                  </Link>
                  <p>Likes: {post.likeCount}</p>
                  <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/4'>
        <Category />
        </div>
      </div>
    </>
  )
}


export default Home