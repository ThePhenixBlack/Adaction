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
   rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Accueil");
});

// Récupérer les bénévoles
app.get("/benevoles", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM benevoles");
    res.json(response.rows);
  } catch (error) {
    console.log("erreur", error);
  }
});

// Ajouter des bénévoles
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


app.get("/collectes/:id", async (req,res)=>{
  try {
    const id = Number(req.params.id)
    const {rows} = await pool.query(
      "SELECT * FROM collectes WHERE collectes.benevole_id = $1",[id]
  )

    return res.json(rows)
    // res.json(rows[0]);
  } catch (error) {
    console.error("GET /collectes/:id error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
})


// Mise à jour de bénévoles
app.patch("/benevoles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, city, password } = req.body;

    const query = `
      UPDATE benevoles 
      SET firstname = $1, lastname = $2, city = $3, password = $4
      WHERE id = $5
      RETURNING *;
    `;

    const result = await pool.query(query, [firstname, lastname, city, password, id]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("erreur PATCH /benevoles/:id:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// //ajoute les collectes d'un bénévole
// app.get("/benevoles/:id/collectes", async (req, res) => {
//   try {
//     const { id } = req.params; // id bnvl
//     const { rows } = await pool.query(
//       // "SELECT * FROM collectes WHERE benevole_id = $1 ORDER BY id DESC",
//       // [id]
//       `SELECT
//       collecte_id,
//       lieu,
//       benevole_id,
//       label,
//       date_collecte,
//       quantity
//       FROM collectes
//       WHERE benevole_id = $1
//       order BY collecte_id DESC
//       `
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error("GET /benevoles/:id/collectes error:", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });


app.get("/benevoles/:id/collectes", async (req, res) => {
  try {
    const { id } = req.params; // id du bénévole

    const sql = `
      SELECT
        c.collecte_id,
        c.date_collecte,
        c.lieu,
        dt.label,           -- nom du déchet
        ci.quantite         -- quantité
      FROM collectes c
      JOIN collecte_items ci   ON ci.collecte_id = c.collecte_id
      JOIN dechet_types dt     ON dt.dechet_type_id = ci.dechet_type_id
      WHERE c.benevole_id = $1
      ORDER BY c.date_collecte DESC, c.collecte_id DESC, dt.label;
    `;

    const { rows } = await pool.query(sql, [id]); 
    res.json(rows);
  } catch (error) {
    console.error("GET /benevoles/:id/collectes error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});








// Récupérer les collectes
app.get("/collectes", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM collectes");
    res.json(response.rows);
  } catch (error) {
    console.log("erreur", error);
  }
});




// Ajouter des collectes 
app.post("/collectes", async (req, res) => {
  try {

     const {benevole_id,city,megots,goblets,cannettes,filets,preservatifs,sacs} = req.body 

    const query = `
         INSERT INTO collectes (benevole_id,city,megots,goblets,canettes,filets,preservatifs,sacs)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
      `;


     const params = [benevole_id, city, megots, goblets, cannettes, filets, preservatifs, sacs];

    const result = await pool.query(query,params);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("erreur POST /collectes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
  });

  // Mise à jour de collectes
  app.patch("/collectes", async (req, res) => {
  try {
    const query = `UPDATE collectes
      SET ville = $1, benevole_id = $2, name = $3, quantity = $4
      WHERE id = $5 RETURNING *`;

    const values = [req.body.ville, req.body.benevole_id, req.body.name, req.body.quantity, req.body.id];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("erreur POST /collectes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// Suppression de bénévoles
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


app.get("/benevoles/:id", async (req,res)=> {
  try {
    const {id} = req.params
    const {rows} = await pool.query(
      "SELECT id, firstname, city FROM benevoles WHERE id= $1",
      [id]
    )
    res.json(rows[0]);   
  } catch (error) {
    console.error("GET /benevoles/:id error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
})


// authentification
app.post("/login", async (req, res) => {
  try {
    const { firstname, password } = req.body;
    if (!firstname || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const query = `
      SELECT id, firstname 
      FROM benevoles 
      WHERE firstname = $1 AND password = $2
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [firstname, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // OK: on renvoie l'id (et le firstname si tu veux l'afficher)
    res.json({ ok: true, userId: rows[0].id, firstname: rows[0].firstname });
  } catch (err) {
    console.error("erreur POST /login:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

//commentaire


app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
