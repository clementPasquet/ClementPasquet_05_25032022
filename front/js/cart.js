const urlOrder = "http://localhost:3000/api/products/order"

// cette fonction permet de récupérer le panier
function getProduct() {
    let local = [];
    for (let i = 0; i < localStorage.length; i++) {
        local[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    return (local);
}
// cette fonction récupére le contenu du panier dans le localStorage et l'affiche article par article
function productBasketDisplay() {
    let Local = getProduct();
    for (let i = 0; i < Local.length; i++) {
        let Produit = Local[i];
        console.log(Produit);
        var url = `http://localhost:3000/api/products/${Produit.id
            }`;
        fetch(url).then(data => data.json()).then(jsonProduct => {
            let productValue = jsonProduct.price * Produit.quantity;
            document.querySelector("#cart__items").innerHTML += ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                                            <div class="cart__item__img">
                                                            <img src=${jsonProduct.imageUrl
                } alt=${jsonProduct.altText
                }>
                                                            </div>
                                                            <div class="cart__item__content">
                                                            <div class="cart__item__content__description">
                                                                <h2>${jsonProduct.name
                }</h2>
                                                                <p>${Produit.color
                }</p>
                                                                <p>${productValue} €</p>
                                                            </div>
                                                            <div class="cart__item__content__settings">
                                                                <div class="cart__item__content__settings__quantity">
                                                                <p>Qté : </p>
                                                                <input type="number" class="itemQuantity" id="${Produit.name}"  onchange="updateQuantity(this.id)"  
                                                                name="itemQuantity" min="1" max="100" value=${Produit.quantity
                }>
                                                                </div>
                                                                <div class="cart__item__content__settings__delete">
                                                                <p class="deleteItem" id="${Produit.name}" onclick="removeItem(this.id)">Supprimer</p>
                                                                </div>
                                                            </div>
                                                            </div>
                                                            </article> `;

        });
    }

}





//cette fonction crée un object avec les informations du formulaire et un tableau des IDs des produits contenus dans le panier
// elle envoie ensuite une requète contenant l'objet et le tableau 
// enfin elle nous redirige sur la page confirmation en récupèrant le numéro de commande dans l'url
function sendOrder() {
    
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    var contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,

    }   
   const check= checkForm(contact);
   console.log(check) ;  
   
  if(check ===0){

        let products = [];
        let basket = getProduct();
        for (i = 0; i < basket.length; i++) {
            var productId = basket[i].id
            products.push(productId);
        }
        if (products.length ==0 ){
            alert("votre panier est vide !")
            location.reload();
        }
        console.log(products);

        const sendFormData = {
            contact,
            products
        }
      console.log(sendFormData)
  
  let send ={
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendFormData),
        
    }
   const postCommand = () => {
        
    fetch("http://localhost:3000/api/products/order", send)

    .then(response => response.json())
    .then(data => {
       ;
        document.location.href = 'confirmation.html?id='+ data.orderId;
    })
    }
    postCommand();

}

else {
    alert("erreur")
}
    }

//cette fonction permet de vérifier les entrées du formulaire avant d'autoriser l'envoi de la requète
function checkForm(contact){



    let mailRegExp =new RegExp(/^[a-z0-9\-_]+[a-z0-9\.\-_]*@{1}[a-z0-9\-_]{2,}\.[a-z\.\-_]+[a-z\-_]+$/i);
    let nameRegExp=new RegExp ("^[A-Z]{1}[a-z ,.'-]+$")
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let erreurSaisie=0;
    
    if (nameRegExp.test(contact.firstName) != true) {
        var erreurFirstName= document.querySelector("#firstNameErrorMsg")
        erreurSaisie=1;
        if(erreurFirstName != ""){
            erreurFirstName.innerHTML="";
        }
        erreurFirstName.innerHTML += "Prenom invalide"
        firstName.value="";
      
    }
    else{
        var erreurFirstName= document.querySelector("#firstNameErrorMsg")
        erreurFirstName.innerHTML="";

    }
    if (nameRegExp.test(contact.lastName)!= true) {
        erreurSaisie=1;
        var erreurLastName= document.querySelector("#lastNameErrorMsg")
        if(erreurLastName != ""){
            erreurLastName.innerHTML="";
        }
        erreurLastName.innerHTML += "Nom invalide"
        lastName.value="";
    }
    else{
        var erreurLastName= document.querySelector("#lastNameErrorMsg")
        erreurLastName.innerHTML="";

    }
    if (addressRegExp.test(contact.address) != true) {
        erreurSaisie=1;
        var erreur= document.querySelector("#addressErrorMsg")
        if(erreur != ""){
            erreur.innerHTML="";
        }
        erreur.innerHTML += "adresse invalide"
        address.value="";
        

    }
    else{
        var erreurAddress= document.querySelector("#addressErrorMsg")
        erreurAddress.innerHTML="";

    }
    if (nameRegExp.test(contact.city) != true) {
        erreurSaisie=1;
        var erreurCity= document.querySelector("#cityErrorMsg")
        if(erreurCity != ""){
            erreurCity.innerHTML="";
        }
        erreurCity.innerHTML += "ville invalide"
        city.value="";
    }
    else{
        var erreurCity= document.querySelector("#cityErrorMsg")
        erreurCity.innerHTML="";

    }
    if (mailRegExp.test(contact.email) != true) {
        erreurSaisie=1;
        var erreurMail= document.querySelector("#emailErrorMsg")
        if(erreurMail != ""){
            erreurMail.innerHTML="";
        }
        erreurMail.innerHTML += "email invalide"
        email.value="";

    }
    else{
        var erreurMail= document.querySelector("#emailErrorMsg")
        erreurMail.innerHTML="";
       
    }
   
    return (erreurSaisie)
}


// cette fonction supprime un item à partir de son ID recupéré dans le code html
function removeItem(id) {
    console.log(id);
    localStorage.removeItem(`productCart${id}`)
    alert("produit supprime")
    location.reload()
}
// cette fonction permet de modifier la quantité dans le panier
function updateQuantity(id) {
    let quantityButton = document.querySelector("#cart__items");
    quantityButton.addEventListener("change", (e) => {
        const isButton = e.target.className === "itemQuantity";
        if (isButton) {
            var basket = getProduct();
            let foundProduct = basket.find(p => p.name === (id));
            var quantity = Number(e.target.value);
            if (quantity >= 1 && quantity <= 100) {
                foundProduct.quantity = quantity
                localStorage.setItem(`productCart${foundProduct.name}`, JSON.stringify(foundProduct));
                alert("produit changé");
                location.reload();
            }
            else {
                alert("quantité invalide (Min:1 Max:100)")
            }
        }

    })
}





// cette fonction permet de calculer le prix total du panier. 
// on recupere la quantité de chaque produits dans le localStorage
//puis on recupère les prix via l'api
//on calcul ensuite le prix total
async function totalPrice() {
    var basket = getProduct();
    let basketPrice = 0
    for (i = 0; i < basket.length; i++) {

        var price = await fetch(`http://localhost:3000/api/products/${basket[i].id} `)
        .then(data => data.json()).then(jsonProduct => { return (jsonProduct.price) })

        parseInt(price);
        console.log(price);

        var basketItem = basket[i];
        var Quantity = parseInt(basketItem.quantity)
        console.log(Quantity);

        var itemPrice = Quantity * price
        console.log(itemPrice);

        basketPrice += itemPrice;
        console.log(basketPrice);
    }
    return (basketPrice)
}

// cette fonction affiche le prix total
async function priceDisplay() {
    let Price = await totalPrice();
    console.log(Price);
    let prix = document.querySelector("#totalPrice")
    prix.innerHTML += `${Price}`
}

productBasketDisplay();
priceDisplay();

