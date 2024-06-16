import { RowDataPacket } from "mysql2";

export default interface Post extends RowDataPacket {
    id?: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
    updated_at: string; 
    admin_id: number;
    like_count: number; 
}
