import axios from "axios";

// La methode qui corresondre avec la route post
// ça retourne une promesse
// Pour tester la requete, on pare dans composants
// export function getPosts() {
//     return new Promise(resolve => {
//         axios.get("http://localhost:4000/")
//         .then(console.log)
//         .catch(console.error)
//     })
// }
export function getPosts() {
    return new Promise(resolve => {
        // .then(res => res.status === 200 && res.data) equivaut à
        // on verifie le statut et on retourne le resultat
        // On resolve la fonction qui retourne la promesse
        // axios.get("http://localhost:4000/posts")
        axios.get("posts")
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.error)
    })
}
// export function getPosts() {
//     return new Promise(resolve => {
//         axios.get("/posts")
//         .then(res => res.status === 200 && res.data)
//         .then(res => res.status === 200 && res.data)
//         .then(resolve)
//         .catch(console.error)
//     })
// }

// export function insertPost(body) {
//     return new Promise(resolve => {
//         axios.post("http://localhost:4000/posts/insert", body)
//         .then(res => res.status === 200 && res.data)
//         .then(resolve)
//         .catch(console.error)
//     })
// }
export function insertPost(body) {
    return new Promise(resolve => {
        axios.post("/posts/insert", body)
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.error)
    })
}