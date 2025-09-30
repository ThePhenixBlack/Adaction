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

require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
