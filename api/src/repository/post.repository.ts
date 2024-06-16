
import Post from "../models/post.model";
import db from "../db";
import { resolve } from "path";
import { RowDataPacket } from "mysql2";

interface IPostRepository {
    findById(id: string): Promise<Post | null>;
   
}


class PostRepository implements IPostRepository {

    async findById(id: string): Promise<Post | null> {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM posts WHERE id = ?";
            db.query<RowDataPacket[]>(sql, [id], (err: URIError| null, data: RowDataPacket[]) => {
                if (err) {
                    console.error("Database error:", err);
                    return reject(err);
                }

                if (data.length > 0) {
                    const post: Post = {
                        id: data[0].id ,
                        title: data[0].title ,
                        content: data[0].content ,
                        category: data[0].category ,
                        created_at: data[0].created_at,
                        updated_at: data[0].updated_at,
                        admin_id: data[0].admin_id,
                        like_count: data[0].like_count 
                    };
                    resolve(post);
                } else {
                    console.log("Post not found:", data);
                    resolve(null);
                }
            });
        });
    }
}


export default PostRepository