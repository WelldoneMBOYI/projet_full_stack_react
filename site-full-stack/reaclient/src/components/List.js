import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context";
// import data from "../data";
// import { getPosts } from "../service";

export default function List(){
    // useEffet, useState sont de hooks: utilise les effets de bord au moment du chargement une seule fois
    // useState crée une var local et une fction getteur qui met à jour cette var
    // par defaut un tableau vide une val initiale
    // const [posts, setPosts] = useState( [] )
    // then retourne une promesse
    // En retour de cette promesse, on aura le resultat, une collection des posts

    const { posts } = useAppContext();
    // debugger
    // On va lancer maintenant la requete dans App
    // useEffect(() => {
    //     getPosts().then(setPosts)
    // }, [])

    // Assurez-vous que posts est bien un tableau
    const safePosts = Array.isArray(posts) ? posts : [];

    return(
        <div className="mt-5">
            {/* map() c'est pour faire des iterations */}
            {/* {data.map(itm => { */}
            {/* On fait maintenant l'iteration sur posts et non sur data
            qui etait juste une var de test */}
            {safePosts.map(post => {
                // Remplacer chaque element par un tiret
                const title = post?.title.split(" ").join("-");
                // Afficher seulement 100 caractere et du contenu static ... avec $ et les tirles
                const content = `${post?.content.substring(0, 100)} ...`;
                return(
                    // Toute iteration avec react, il faut tjrs lui fournir une clef
                    // qui va permettre d'optimiser le rerender uniquement l'element concerné par le changement
                    <div key={post._id}>
                        {/* <h3><Link to="/post/title">{itm.title}</Link></h3> */}
                        {/* <h3><Link to={`/post/${title}`} state={{id : post._id}}>{post.title}</Link></h3> */}
                        {/* state permet de transmettre des paramettres exemples :id etc qui seront recuperer 
                        au niveau du composant enfant par useLocation*/}
                        <h3><Link to={`/post/${title}`} state={{id: post._id}}>{post.title}</Link></h3>
                        {/* <h3>{itm.title}</h3> */}
                        <p>{content}</p>
                    </div>
                )
            })}
        </div> 
    )
}
