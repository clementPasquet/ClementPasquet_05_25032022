var url = "http://localhost:3000/api/products";

fetch(url)
.then(data => data.json())
.then(jsonListArticle => {
    for (let jsonArticle of jsonArticle){
        let article = new Article (jsonArticle);
        document.querySelector(article).innerHtml +=  <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                                                     <h3 class="productName">${article.name]</h3>
                                                    <p class="productDescription">${article.description}</p>
    }
})