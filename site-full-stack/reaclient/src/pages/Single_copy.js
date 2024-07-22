import React from "react";
import { useLocation, Link} from "react-router-dom"
import data from "../data"

export default function Single() {
    // useLocation : donne plusieurs infos ( le lien de nav et parametres transmis au moment de la navigation )
    // const params = useLocation();
    // On destructure le state pour recuperer direcetment l'id
    const {state: { id }} = useLocation();
    // On utilise uniquement params avec gestion du vide soit on passe par
    // params ou soit par state
    const params = useLocation();
    // params?.state?.id veut dire si on ne passe pas par la navigation, on va 
    // passer par state equivaut à de l'optional change (l'appli retourne null sans crachée)
    const post = data.find(post => post._id === params?.state?.id);
    // Utilisatioin de l'element d'ordre sup qui fait une iteration et une evaluation
    // Il compare l'id dans data et l'id qui vient de l'url ou transmis par state afin
    // d'afficher l'element concerné qui sera stocké dans const post
    // const post = data.find(post => post._id === id);
    // debugger //Arrete automatique l'execution du programme

    return(
        <>
            <Link to="/">back</Link>
            {/* {post?.title} equivaut à eviter à l'appli
            de s'interrompre à cause de l'objet null */}
            <h1>{post?.title}</h1>
            <p>{post?.content}</p>
        </>)
    // return(<h1>Single page</h1>)
}