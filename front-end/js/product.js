

let params = new URL(document.location).searchParams;
let id = params.get("id"); 


const productCardImg = document.querySelector(".img");
const productCardName = document.querySelector(".product-card__title");
const productCardDescription = document.querySelector(".product-card__description");
const productCardPrice = document.querySelector(".product-card__price");
const numberObj = document.querySelector("#numero");
const colorSelect = document.querySelector("#color-select");


main();

function main(){
  getArticles();
  AjoutPanier();
  check404();
}


// Récupère le  produit dont on a besoin avec le peramètre dans la requete 
function getArticles(){

  fetch(` http://localhost:3000/api/furniture/${id}`)
  .then(function (reponse) {
  return reponse.json();
})
.catch((error) => {
  let container = document.querySelector(".container");
  container.innerHtml= "Nous n'avons pas réussi à afficher la page"; 
  container.style.TextAlign ="center";
  container.style.padding = "40px 0";
})
//Données recues via API 
.then(function (resultatAPI) {
  articles = resultatAPI;
  productCardName.innerHtml = article.name;
  productCardImg.src = article.imageUrl;
  productCardDescription.innerText = article.description;

//Prix affiché en euros 
article.price = article.price / 100;
productCardPrice.innerHtml = new Intl.NumberFormat("fr-FR",{
  style: "currency",
  currency: "EUR",
}).format(article.price);

let colorSelect = document.getElementById("color-select");
for (let i = 0; i < article.colors.length ; i++){
  let option = document.createElement("option");
  option.innerText = article.colors[i];
  colorSelect.appendChild(option);
  }

 });

}


function AddToCarts(){
 const AddToCartsBtn = document.querySelector("..add-to-cart");
 const confirmation = document.querySelector(".added-to-cart-confirmation");
 const textConfirmation = documenr.querySelector(".confirmation-text");

 AddToCartsBtn.addEventListemer("click", () => {
   // if num est > 0 // num <100 
   if (numberObj > 0 && numberObj < 100) {
   // --- produit qui sera ajouté au panier 
   let productAdded = {
     name : productCardName.innerHtml,
     price: parseFloat(productCardPrice),
     quantity: parseFloat(document.querySelector("#numero").value),
     _id: id,
   };
   

   // ------ LOCALSTORAGE
   let arrayProductsInCart = [];

   // Sis le LOCALSTORAGE existe recupere son contenu on l'insere dans l' arrayProductsInCart, puis on le renvoit dans LOCALSTORAGE avec le produit ajouté

   if (localStorage.getItem("products") !== null) {
     arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

     // sis le LOCALSTORAGE est vide, on le créé avec le produit ajouté
   }
   arrayProductsInCart.push(productAdded);
   localStorage.setItem("products", JSON.stringify(arrayProductsInCart));


   confirmation.style.visibility = "visible";
   textConfirmation.innerHtml = 'Vous avez ajouté ${numberObj.value} forniture a votre panier!';
   setTimeout("locatio.reload(true)", 4000);
   } else{
     confirmation.style.visibility = "visible";
     textConfirmation.style.background = "green";
     textConfirmation.style.border = "green";
     textConfirmation.style.color = "white";
     textConfirmation.style.whiteSpace = "normal";
     textConfirmation.innerText = `La quantité doit être comprise entre 1 et 50.`;
   }

 });
 
}


function check404() {
  window.addEventListener("error", (e) => {
      let container = document.querySelector(".container");
      container.innerHTML = `<p>Cette page n'existe pas. <a class="back-to-home" href="index.html">Retourner dans la boutique ?</a></p>`;
      container.style.padding = "40vh 0";
      container.style.fontSize = "26px";
      let backToHomeLink = document.querySelector(".back-to-home");
      backToHomeLink.style.textDecoration = "underline";
    },
    true
  );
}