// Importation des modules nécessaires
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

// Instance d'express et configuration du port
const app = express();
const routes = express.Router()
const port = 4000;

// Permet à l'instance express de use cors comme middleware
app.use(cors());
// Le format qui accompagne la requete http
app.use(express.json());
app.use("/posts", routes);
require("./routes")(routes)
// Lire à partir du fichier .env
dotenv.config();

// Utilisation de la variable d'environnement
const uri = process.env.STRING_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function main() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connecté avec succès à la db");

    // Utilisation de la méthode de routage, afin de retourner les ressources
    app.get("/", async (_, res) => {
      try {
        const db = client.db("blogdb");
        const posts = await db.collection("posts").find().toArray();
        console.log(posts);
        res.status(200).send(posts);
      } catch (err) {
        console.error(err);
        res.status(500).send("Erreur du serveur");
      }
    });

    // Utilisation de la méthode de routage POST
    const obj = { title: "titre", content: "contenu...." };
    app.post("/insert", async (req, res) => {
      try {
        const db = client.db("blogdb");
        // const result = await db.collection("posts").insertOne(obj);
        const result = await db.collection("posts").insertOne(req.body);
        console.log("Document inséré avec succès", result);
        res.status(200).send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Erreur du serveur");
      }
    });

    // Démarrage du serveur
    app.listen(port, () => {
      console.log(`Serveur démarré avec succès sur le port ${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}

// Appeler la fonction main pour démarrer l'application
main().catch(console.error);

// Fermer le client lorsque l'application est terminée
process.on("SIGINT", async () => {
  await client.close();
  console.log("Connexion à la db fermée");
  process.exit(0);
});
