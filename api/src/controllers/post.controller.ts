
import PostRepository from "../repository/post.repository"
import { Request, Response } from 'express';

class PostController{
    private PostRepository:  PostRepository

    constructor(){
      this.PostRepository =  new PostRepository();

    this.findById = this.findById.bind(this)
    }


    findById  = async (req: Request, res: Response): Promise<void> => {
            try{

                const postId = req.params.id;
                const post = await this.PostRepository.findById(postId)
                res.status(200).json(post);
            }catch (error: any) {
                res.status(404).json({ message: error.message });
            }


    }
}

export default PostController;
