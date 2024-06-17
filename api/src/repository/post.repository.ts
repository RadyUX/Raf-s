
import Post from "../models/post.model";
import db from "../db";
import { resolve } from "path";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { rejects } from "assert";

interface IPostRepository {
    findById(id: string): Promise<Post | null>;
    findAll(category: string): Promise<Post[]>
    create(post: Post): Promise<Post>
}


//fonction pour un format de date accepter par mySQL
function formatDateToMySQL(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
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


    async findAll(category?: string): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            const sql = category ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts"
            const queryValues = category ? [category] : [];
            db.query<RowDataPacket[]>(sql, queryValues ,(err: URIError | null, data: RowDataPacket[]) => {
                if (err) {
                    return reject(err);
                }
                
                // Map the result set to Post array
                const posts: Post[] = data.map(row => ({
                    id: row.id as number,
                    title: row.title as string,
                    content: row.content as string,
                    category: row.category as string,
                    created_at: row.created_at as string,
                    updated_at: row.updated_at as string,
                    admin_id: row.admin_id as number,
                    like_count: row.like_count as number
                }));

                resolve(posts);
            });
        });
    }

    async create(post: Post): Promise<Post> {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO posts (`title`, `content`, `category`,`image`, `created_at`, `updated_at`, `admin_id`,`like_count` ) VALUES (?,?,?, ?, ?, ?, ?,?)";
            const values = [post.title, post.content, post.category,post.image,  formatDateToMySQL(new Date(post.created_at)), formatDateToMySQL(new Date(post.updated_at)), post.admin_id, post.like_count];

            db.query<ResultSetHeader>(sql, values, (err, result) => {
                if (err) {
                    return reject(err);
                }

                const newPost: Post = {
                    ...post,
                    id: result.insertId
                };
                resolve(newPost);
            });
        });
    }
}


export default PostRepository