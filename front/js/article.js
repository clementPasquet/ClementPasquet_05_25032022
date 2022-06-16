
// ce constructeur sert a la creation des articles dans script.js
class Article {
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle)

        
    }
}
