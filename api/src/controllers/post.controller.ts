
import PostRepository from "../repository/post.repository"
import { Request, Response } from 'express';
import Post from "../models/post.model";
class PostController{
    private PostRepository:  PostRepository

    constructor(){
      this.PostRepository =  new PostRepository();

    this.findById = this.findById.bind(this)
    this.findAll = this.findAll.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
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

    findAll =  async (req: Request, res: Response): Promise<void> => {
        try{
            const category = req.query.category as string
            const posts = await this.PostRepository.findAll(category)
            res.status(200).json(posts);
        
        }catch(err: any){
            res.status(500).json({ message: err.message });
        }
    }

    create = async (req: Request, res: Response): Promise<void> =>{
        
        
        try{
            
            const post: Post = {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                image: req.body.image,
                created_at: new Date().toISOString(), // Assurez-vous que la date est bien formatée
                updated_at: new Date().toISOString(), // Ajoutez updated_at si nécessaire
                admin_id: req.body.admin_id, // Assurez-vous que admin_id est fourni
                like_count: 0 // Initialiser like_count à 0 ou à une valeur par défaut
            };
            const newPost = await this.PostRepository.create(post)
            res.status(201).json(newPost);
        }catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    update = async (req: Request, res: Response): Promise<void> =>{
        try{
            const id = req.params.id
            const post: Post = {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                image: req.body.image,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(), // Ajoutez updated_at si nécessaire
                admin_id: req.body.admin_id, // Assurez-vous que admin_id est fourni
              
            };

            const updatedPost = await this.PostRepository.update(id, post)
            if (updatedPost) {
                res.status(200).json(updatedPost);
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        }catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default PostController;
