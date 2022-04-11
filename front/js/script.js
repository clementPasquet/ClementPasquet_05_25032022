
var productId=0;



function productDisplay(){
var url = "http://localhost:3000/api/products";  
fetch(url)
.then(data => data.json())
.then(jsonListArticle => {
    for (let jsonArticle of jsonListArticle){
        let article = new Article (jsonArticle);
        document.getElementById('items').innerHTML +=               
             ` <a  href="./product.html?id=${article._id}">
             <article>
             <img src=${article.imageUrl} alt=${article.altText}>
         <h3 class="productName">${article.name}</h3>
       <p class="productDescription">${article.description}</p>
       </article>
       </a> ` ;
}});
}; 



productDisplay();