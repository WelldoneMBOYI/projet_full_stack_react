// Importation des modules nécessaires
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { MongoClient, ServerApiVersion } from "mongodb";

// Instance d'express et configuration du port
const app = express();
const routes = express.Router();
const port = 4000;

// Middleware pour gérer CORS et les requêtes JSON
app.use(cors());
app.use(express.json());
app.use("/posts", routes);

// Lire à partir du fichier .env
dotenv.config();

// Utilisation de la variable d'environnement
const uri = process.env.STRING_URI;

// Créer un MongoClient avec un objet MongoClientOptions pour définir la version de l'API stable
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Importer les routes
require("./routes")(routes, client);


const public_path = path.join(__dirname, '../build');
app.use(express.static(public_path));
app.get("*", (_, res) => {
    res.sendFile(path.join(public_path, 'index.html'));
})

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré avec succès sur le port ${port}`);
});

// Fermer le client lorsque l'application est terminée
process.on("SIGINT", async () => {
  await client.close();
  console.log("Connexion à la db fermée");
  process.exit(0);
});
