

function getProduct(){
let local=[];
for (let i=0; i<localStorage.length ; i++){
 local[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
}
return(local);
}

function productDisplay(){
let Local = getProduct();
for (let i=0; i<Local.length ; i++){
let Produit = Local[i];
console.log(Produit);
var url = `http://localhost:3000/api/products/${Produit.id}`;  
fetch(url)
.then(data => data.json())
.then(jsonProduct => {
    let productValue = jsonProduct.price*Produit.quantity;
    document.querySelector("#cart__items").innerHTML += ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                                            <div class="cart__item__img">
                                                            <img src=${jsonProduct.imageUrl} alt=${jsonProduct.altText}>
                                                            </div>
                                                            <div class="cart__item__content">
                                                            <div class="cart__item__content__description">
                                                                <h2>${jsonProduct.name}</h2>
                                                                <p>${Produit.color}</p>
                                                                <p>${productValue} €</p>
                                                            </div>
                                                            <div class="cart__item__content__settings">
                                                                <div class="cart__item__content__settings__quantity">
                                                                <p>Qté : </p>
                                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${Produit.quantity}>
                                                                </div>
                                                                <div class="cart__item__content__settings__delete">
                                                                <p class="deleteItem" id="clc" click="deleteCartItem()" data_id=${Produit.id}>Supprimer</p>
                                                                </div>
                                                            </div>
                                                            </div>
                                                            </article> `;
                                             
});
}
}




productDisplay();




















  


   




