import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import dbConfig from './config/db.config';

async function seedAdmin() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });

        const adminInfo = {
            id: 1,
            name: "Rafaelé",
            email: "rafaele.sinaguglia@gmail.com",
            password: "hash_du_mot_de_passe", 
            avatar: "URL_ou_chemin_vers_avatar"
        };

        const sql = `INSERT INTO admin (id,name, email,  avatar,password) VALUES (?, ?, ?, ?, ?)`;
        const values = [adminInfo.id,adminInfo.name, adminInfo.email, adminInfo.password, adminInfo.avatar];

        await connection.execute(sql, values);
        console.log('Admin inserted successfully');

        await connection.end();
    } catch (error) {
        console.error('Failed to seed admin:', error);
    }
}

seedAdmin();
