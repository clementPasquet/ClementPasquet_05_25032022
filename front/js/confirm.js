function displayOrderId (){
    const id = new URL(window.location.href).searchParams.get("id");

    document.querySelector("#orderId").innerHTML += `${id}`
    localStorage.clear();
}
displayOrderId();