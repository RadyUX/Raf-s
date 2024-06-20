import React from 'react'
import DOMPurify from 'dompurify';



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