
// ce constructeur sert a la création des articles dans script.js
class Article {
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle)

        
    }
}
