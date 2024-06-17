import { Router } from 'express';
import PostController from '../controllers/post.controller';


const postrouter = Router();
const postController = new PostController()

postrouter.get('/post/:id', postController.findById);
postrouter.get('/posts', postController.findAll)
export default  postrouter ;
