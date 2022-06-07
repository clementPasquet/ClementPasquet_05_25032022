const urlOrder = "http://localhost:3000/api/products/order"

function getProduct() {
    let local = [];
    for (let i = 0; i < localStorage.length; i++) {
        local[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    return (local);
}

function productDisplay() {
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
                                                                <input type="number" class="itemQuantity" id="${Produit.name}"  onchange="updateQuantity(this.id)"  name="itemQuantity" min="1" max="100" value=${Produit.quantity
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

function confirm() {
    let orderButton = document.querySelector("#order");
    orderButton.addEventListener("click",  sendOrder);

}


function sendOrder() {
    
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");


     /*new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$', 'g')*/
     let mailRegExp =new RegExp(/^[a-z0-9\-_]+[a-z0-9\.\-_]*@{1}[a-z0-9\-_]{2,}\.[a-z\.\-_]+[a-z\-_]+$/i);
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


    if (charRegExp.test(firstName.value) != true) {
        console.log(firstName);
        erreurFirstName = "Veuillez renseigner votre prénom"
        alert(erreurFirstName)
    }
    if (charRegExp.test(lastName.value )!= true) {
        erreurLastName = "Veuillez renseigner votre nom"
        alert(erreurLastName)

    }
    if (addressRegExp.test(address.value) != true) {
        erreurAddress = "Veuillez renseigner votre addresse"
        alert(erreurAddress)

    }
    if (charRegExp.test(city.value) != true) {
        erreurCity = "Veuillez renseigner votre ville"
        alert(erreurCity)

    }
    if (mailRegExp.test(email.value) != true) {
        erreurMail = "mail invalide"
        alert(erreurMail)

    }

    else {
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,

        }
        console.log(contact);

        let products = [];
        let basket = getProduct();
        for (i = 0; i < basket.length; i++) {
            var productId = basket[i].id
            products.push(productId);
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
    }



        
                









function removeItem(id) {
    console.log(id);
    localStorage.removeItem(`productCart${id}`)
    alert("produit supprime")
    location.reload()
}

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

function setQuantity(quantity, id) {
    console.log(basketQuantity)
    basketQuantity[id][2] = quantity

}




async function totalPrice() {
    var basket = getProduct();
    let basketPrice = 0
    for (i = 0; i < basket.length; i++) {

        var price = await fetch(`http://localhost:3000/api/products/${basket[i].id} `).then(data => data.json()).then(jsonProduct => { return (jsonProduct.price) })

        parseInt(price);
        console.log(price)
        var basketItem = basket[i];
        var Quantity = parseInt(basketItem.quantity)
        console.log(Quantity)
        var itemPrice = Quantity * price
        console.log(itemPrice)
        basketPrice += itemPrice
        console.log(basketPrice);
    }
    return (basketPrice)
}
async function priceDisplay() {
    let Price = await totalPrice();
    console.log(Price);
    let prix = document.querySelector("#totalPrice")
    prix.innerHTML += `${Price}`
}

productDisplay();
priceDisplay();
confirm();
