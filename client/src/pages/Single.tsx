import React from 'react'
import DOMPurify from 'dompurify';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import  { useEffect, useState } from "react";
import authService from '../service/authService';

function Single() {
  const [post, setPost] = useState({});
  const [likeCount, setLikeCount] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const currentUser = authService.getCurrentUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/post/${postId}`);
        setPost(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const [isLiked, setIsLiked] = useState();
   const handleDelete = async () => {
    const token = currentUser?.user.token; 
    const response = await axios.delete(`http://localhost:8000/posts/delete/${postId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    
   })

   navigate('/')

  }
 
  const handleUpdate = async (post: Post) => {
    try{
      
      
      navigate('/write', { state: { post } });
    }catch(err){
      const token = currentUser?.user.token; 
      console.log(token)
    }
   
  }
 
  const handleLike = async () => {
    const token = currentUser?.user.token; // Ensure you have the correct path to the token

    // Toggle the like status locally
    // Assuming initial state is 'false', indicating not liked
  const trueFalseToggle = (boolean: boolean) => {
    return !boolean;  // This simply returns the opposite of the input boolean
};
 console.log("is liked :",isLiked)

 const newLikeStatus = trueFalseToggle(isLiked)
 console.log("new like status;",newLikeStatus)

    try {
      const response = await axios.post(`http://localhost:8000/like/${postId}`, {
        like: newLikeStatus // Send the new intended status to the server
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Post like status:", response.data); // Log the response

      
    } catch (error) {
      console.error('Error toggling like on the post:', error);
   
    
    }
  };
  console.log(post.image)
  return (
    <div className="flex justify-center h-screen max-w-5xl p-8 mx-auto single">
    <div className="w-full p-8 rounded-lg shadow-lg content lg:w-3/4">
      <img 
        src={`../../public/upload/${post?.image}`}
        alt={post?.title} 
        className="object-cover w-full h-64 mb-6 rounded-lg"
      />
      <div className="flex items-center mb-6 user">
      
      </div>
      <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
      <p className="mb-4 text-xl text-gray-700">{post.category}</p>
      <div className="flex items-center mb-6">
        <p className="mr-4 text-lg" >{post.like_count}</p>
        {currentUser && (
        <button
          onClick={handleLike}
          className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700"
        >
          Like
        </button>
      )}
       {currentUser?.decodedToken.isAdmin && (
        <div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700"
        >
         DELETE
        </button>  <button
        onClick={() => handleUpdate(post)}
          className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700"
        >
         Update
        </button>
        </div>
      )}
      
  
      </div>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      ></div>
    </div>
  </div>
  )
}

export default Single