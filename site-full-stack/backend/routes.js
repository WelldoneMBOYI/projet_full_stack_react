// Importation des gestionnaires de requêtes
import { getPosts, insertPost } from "./handlers";

module.exports = (routes, client) => {
  routes.get("/", (req, res) => getPosts(req, res, client));
  routes.post("/insert", (req, res) => insertPost(req, res, client));
};
