import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config()

app.use(cors({ origin: "http://127.0.0.1:5500"}));
const app = express();

app.get("/", (req, res) => {  
res.send("Accueil");
});

app.get("/menu", (req, res) => {    
const data = { "plate": "Hello World Burger", "description": "Un cheeseburger classique (pain, steak, fromage, salade, sauce).","image": "🍔"  };     
res.json(data);
});

app.listen(3000, () => {  console.log("Serveur lancé sur http://localhost:3000");});
