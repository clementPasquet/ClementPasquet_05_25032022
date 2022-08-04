// on recupére le numéro de commande dans l'url et on l'affiche

function displayOrderId (){
    const id = new URL(window.location.href).searchParams.get("id");

    document.querySelector("#orderId").innerHTML += `${id}`
    localStorage.clear();
}
displayOrderId();