import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()
const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500"}));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        require: true,
      },
});



app.get("/", (req, res) => {  
res.send("Accueil");
});


app.get("/benevoles", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM benevoles")
        res.json(response.rows)
    } catch (error) {
        console.log("erreur", error)
    }
    
})


app.listen(3000, () => {  console.log("Serveur lancé sur http://localhost:3000");});
