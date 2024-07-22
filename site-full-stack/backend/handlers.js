// Fonction pour récupérer les posts
export const getPosts = async (req, res, client) => {
    try {
      const db = client.db("blogdb");
      const posts = await db.collection("posts").find().toArray();
      console.log(posts);
      res.status(200).send(posts);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur du serveur");
    }
  };
  
  // Fonction pour insérer un post
  export const insertPost = async (req, res, client) => {
    try {
      const db = client.db("blogdb");
      const result = await db.collection("posts").insertOne(req.body);
      console.log("Document inséré avec succès", result);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur du serveur");
    }
  };
  