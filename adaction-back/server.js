import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));

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
    const response = await pool.query("SELECT * FROM benevoles");
    res.json(response.rows);
  } catch (error) {
    console.log("erreur", error);
  }
});

app.post("/benevoles", async (req, res) => {
  try {

    const {firstname,lastname,city,password} = req.body 

    const query = `
        INSERT INTO benevoles (firstname, lastname, city, password)
        VALUES ($1, $2, $3, $4) RETURNING *
      `;
   
    const result = await pool.query(query, [firstname,lastname,city,password]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("erreur POST /benevoles:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.patch("/benevoles", async (req, res) => {
  try {
    const query = `UPDATE benevoles 
      SET city = $1 
      where id = $2 `;

    const values = ["Marseille", "2"];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("erreur POST /benevoles:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/benevoles", async (req, res) => {
  try {

    const {user_id} = req.body 
    
    const query = `DELETE FROM benevoles WHERE id= $1`;



    const result = await pool.query(query, [user_id]);

    res.status(200).json({message:"good"});
  } catch (error) {
    console.error("erreur POST /benevoles:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
