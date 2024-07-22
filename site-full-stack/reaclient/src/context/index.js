import { createContext, useContext, useMemo, useState } from "react"
import { getPosts, insertPost } from "../service"

// useContext est un hook personnalisé
// useMemo retourne une val memorisée
// useState pour créer des val locales qui vont devenir globales par la suite
/**Creation de l'objet context qui nous donne acces à deux 
 * composants : Provider et Consumer qu'on ne va pas utiliser dans cet exemple
 * on le met dans le composant principal AppProvider qui se trouve au plus au niveau
 * de l'appli, de la hierarchie de l'appli
 * et va permettre aux composants descendants de souscrire et de
 * d'acceder à des variables globales, cà-d un etat global
 * Provider prends une seule props qui se nomme value
 * c'est cette props (propriet") qui ve permettre de partager 
 * avec le reste de l'appli des var globales
 * Toute la logique de l'appli se trouve au niveau du context
 * 
 * par la suite, on enveloppe le point d'entree de l'appli
 * par le composant AppProvider pour permettre à tous les composants descendants
 * de souscrire au context pour acceder aux valeurs globales
  */
const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ children}) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        getPosts().then(setPosts)
    }
    const addPost = (body) => {
        insertPost(body).then(setPosts)
    }
    const value = useMemo(() => {
        return {
            posts, 
            fetchPosts, 
            // Rendre disponible le addPost
            addPost
        }
        // On le rajout dans les dependances puisqu'on va l'utiliser à l'exterieur du context
    }, [posts, fetchPosts, addPost])
    return <Provider value={value}>{children}</Provider>
}

/** useAppContext est un hook personnalisé, le role de ce hook
 * on va pouvoir l'utilisant dans les composants fonctionnels, on
 *  va pouvoir reutiliser la logique. Il prend en paramettres
 * le AppContext definit plus haut.
 * 
 * plus loin dans le composant List, au lieu de faire des 
 * appels reseaux directement, à la place on va permet au 
 * composant de s'abonner au changement du context avec 
 * et on utilise useAppContext
*/
export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppProvider;