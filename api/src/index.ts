import { Express } from "express";
import express from 'express'
import db from "./db"
import UserRepository from "./repository/user.repository";
import User from "./models/user.model";
import UserController from "./controllers/user.controller";
import authrouter from "./routes/auth.route";
import userrouter from "./routes/user.route";
import cors from "cors"
const app: Express = express()
const PORT = 8000;

app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Connected at http://localhost:${PORT}`);
    db
});

const userController = new UserController()
const userRepo = new UserRepository(); 
app.use(cors())
app.use('/', authrouter);
app.use('/', userrouter)

/*async function exampleUsage() {
  try {
      const newUser = {
          
          name: 'michel Doe',
          email: 'michszzzssel@example.com',
          password: 'securepassword',
          avatar: 'path/to/avatar.jpg'
      };
      const user = await userRepo.create(newUser);
      console.log("Created User:", user);
  } catch (error) {
      console.error("Error creating user:", error);
  }
}

exampleUsage();
  */