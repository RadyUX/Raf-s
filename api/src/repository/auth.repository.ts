//auth.repository.ts

import db from "../db";
import Admin from "../models/admin.model";

interface IAuthRepository{
    login(email: string, password: string): Promise<Admin | null>;
}

class AuthRepository implements IAuthRepository {
    async login(email: string, password: string): Promise<Admin | User | null> {
        // Vérifier d'abord dans la table des administrateurs
        let sql = `SELECT * FROM admins WHERE email = ?`;
        let [results] = await db.promise().query<Admin[]>(sql, [email]);
        if (results.length > 0) {
            const admin = results[0];
            const passwordIsValid = await bcrypt.compare(password, admin.password);
            if (passwordIsValid) {
                return admin;  // Retourner l'admin si le mot de passe est valide
            }
        }
