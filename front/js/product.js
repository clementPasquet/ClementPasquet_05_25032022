let produit = window.location.search.split("?id=").join("");

// cette fonction permet de récupérer le panier
function getProduct() {
  let local = [];
  for (let i = 0; i < localStorage.length; i++) {
    local[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
  }
  return local;
}

// cette fonction récupére les données de l'api relatives au produit selectionné puis les affiches sur la page web
function productDisplayPage() {
  var url = `http://localhost:3000/api/products/${produit}`;
  fetch(url)
    .then((data) => data.json())
    .then((jsonProduct) => {
      console.log(jsonProduct);
      document.querySelector(
        ".item__img"
      ).innerHTML += `<img src=${jsonProduct.imageUrl} alt=${jsonProduct.altTxt}>`;

      document.querySelector(
        ".item__content__titlePrice"
      ).innerHTML += ` <h1 id="title">${jsonProduct.name}</h1>
                                                        <p>Prix : <span id="price">${jsonProduct.price}</span>€</p>`;

      document.querySelector(
        ".item__content__description"
      ).innerHTML += ` <p class="item__content__description__title">Description :</p>
                                                          <p id="description">${jsonProduct.description}</p>`;
      for (let i = 0; i < jsonProduct.colors.length; i++) {
        let color = jsonProduct.colors[i];
        document.querySelector(
          "#colors"
        ).innerHTML += `<option value="${color}">${color}</option>`;
      }
    });
}

// Cette fonction reçoit en paramètre le produit de la page et sert a l'ajouter au panier
function addToCart(produit) {
  let button = document.querySelector("#addToCart");
  let basket = getProduct(); // on recupére le contenu du panier

  button.onclick = () => {
    // au clique on vérifie dans un premier temps si le produit existe deja dans le panier grace au name (id+couleur)
    let foundProduct = basket.find((p) => p.name === produit + colors.value);
    console.log(foundProduct);
    // si on trouve un produit on regarde si la couleur est la mème . Si c'est le cas on modifiera le produit dans la bonne catégorie
    if (foundProduct != undefined) {
      if (foundProduct.name === produit + colors.value) {
        foundProduct.quantity =
          parseInt(foundProduct.quantity) + parseInt(quantity.value);
        console.log(foundProduct.quantity);
        if (foundProduct.quantity <= 100 && quantity.value >= 1) {
          localStorage.setItem(
            `productCart${foundProduct.name}`,
            JSON.stringify(foundProduct)
          );
          alert("panier mis a jour");
          foundProduct = [];
        } else {
          alert(" Max :100 Min :1");
        }
      } else if (
        foundProduct.id === produit &&
        foundProduct.color != colors.value
      ) {
        foundProduct.color == colors.value;
        foundProduct.name == produit + colors.value;
        if (foundProduct.quantity <= 100 && quantity.value >= 1) {
          localStorage.setItem(
            `productCart${foundProduct.name}`,
            JSON.stringify(foundProduct)
          );
          alert("votre produit a bien été ajouté au panier");
          foundProduct = [];
        } else {
          alert(" Max :100 Min :1");
        }
      }
    }
    //sinon on ajoute un nouveau produit au panier en passant par le localStorage
    else {
      if (colors.value != "" && quantity.value <= 100 && quantity.value >= 1) {
        var productCart = {
          name: produit + colors.value,
          id: produit,
          color: colors.value,
          quantity: quantity.value,
        };

        console.log(productCart);

        localStorage.setItem(
          `productCart${productCart.name}`,
          JSON.stringify(productCart)
        );
        alert("votre produit a bien été ajouté au panier");
      } else {
        alert("veuillez saisir une couleur et une quantité adaptée.");
      }
    }
    location.reload();
  };
}

productDisplayPage();

addToCart(produit);
