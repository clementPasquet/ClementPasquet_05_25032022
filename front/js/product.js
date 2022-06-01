


let produit= window.location.search.split("?id=").join("");


function getProduct() {
    let local = [];
    for (let i = 0; i < localStorage.length; i++) {
        local[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    return(local);
}
function productDisplayPage(){
    var url = `http://localhost:3000/api/products/${produit}`;  
    fetch(url)
    .then(data => data.json())
    .then(jsonProduct => {
        console.log(jsonProduct);
       document.querySelector(".item__img").innerHTML += `<img src=${jsonProduct.imageUrl} alt=${jsonProduct.altTxt}>`;

       document.querySelector(".item__content__titlePrice").innerHTML += ` <h1 id="title">${jsonProduct.name}</h1>
                                                        <p>Prix : <span id="price">${jsonProduct.price}</span>€</p>`;

       document.querySelector(".item__content__description").innerHTML += ` <p class="item__content__description__title">Description :</p>
                                                          <p id="description">${jsonProduct.description}</p>`;
    for(let i=0 ; i < jsonProduct.colors.length ; i++){
       let color = jsonProduct.colors[i]
       document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
                                                 
    };

    })};

function addToCart(produit){
   let button = document.querySelector("#addToCart");
   let basket =getProduct();
  
    button.onclick = () => {
   let foundProduct =basket.find(p =>p.name === (produit+colors.value));
   console.log(foundProduct);

    if (foundProduct != undefined){
    if (foundProduct.name === (produit+colors.value)){
         foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(quantity.value)
         console.log(foundProduct.quantity);
         localStorage.setItem(`productCart${foundProduct.name}`,JSON.stringify(foundProduct));
         alert ("panier mis a jour");
         foundProduct=[];
    }
    else if (foundProduct.id===produit && foundProduct.color != colors.value) {
        foundProduct.color == colors.value
        foundProduct.name == (produit+colors.value)
        localStorage.setItem(`productCart${foundProduct.name}`,JSON.stringify(foundProduct));
        alert('votre produit a bien été ajouté au panier'); 
        foundProduct=[];     
    }
     }

    else { 

     if(colors.value !="" && 100 >= quantity.value > 0 ){
        
        var productCart = {
            name :produit+colors.value,
              id : produit,
              color : colors.value,
              quantity:quantity.value,
             
         }
       
        console.log(productCart)
      
        localStorage.setItem(`productCart${productCart.name}`,JSON.stringify(productCart));
      alert('votre produit a bien été ajouté au panier');
        
     }
     else{
        alert('veuillez saisir une couleur et une quantité adaptée.')
     };
    }
    location.reload();
}

    };
  
;    

    productDisplayPage();
    
    
    
    addToCart(produit);
    