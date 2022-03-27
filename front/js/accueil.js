var url = "http://localhost:3000/api/products";

fetch(url)
.then(data => data.json())
.then(jsonListArticle => {
    for (let jsonArticle of jsonListArticle){
        let article = new Article (jsonArticle);
        console.log(article);
        document.querySelector('#items').innerHtml +=                ` <a id="productLink" href="./product.html?id=42">
                                                                          <article>
                                                                 <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                                                                 <h3 class="productName">${article.name}</h3>
                                                                          <p class="productDescription">${article.description}</p>
                                                                        </article>
                                                                              </a> `   
}}); 

document.querySelector('#items').addEventListener("click", getID);

function getID(){
    
}