import { Express } from "express";
import express from 'express'
import db from "./db"


const app: Express = express()
const PORT = 8000;

app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Connected at http://localhost:${PORT}`);
    db
});



