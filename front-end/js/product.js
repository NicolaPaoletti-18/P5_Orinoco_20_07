

let params = new URL(document.location).searchParams;
let id = params.get("id");


const productCardImg = document.querySelector(".img");
const productCardName = document.querySelector(".product-card__title");
const productCardDescription = document.querySelector(".product-card__description");
const productCardPrice = document.querySelector(".product-card__price");
const numberObj = document.querySelector("#numero");
const verniceSelect = document.querySelector("#vernice-select");




main();

function main() {

  getArticles();
  AjoutPanier();

}



// Récupère le  produit dont on a besoin avec le peramètre dans la requete 
function getArticles() {
  fetch(` http://localhost:3000/api/furniture/${id}`)
    .then(function (reponse) {
      return reponse.json();
    })
    
    .catch((error) => {
      let container = document.querySelector(".product-card");
      container.innerHtml = "<p> Nous n'avons pas réussi à afficher la page  (Port 3000) </p>";
      container.style.TextAlign = "center";
      container.style.padding = "40px 0";
    })
    
    //--------Données recues via API ---------
    .then(function (article) {
      
      productCardName.innerText = article.name;
      productCardImg.src = article.imageUrl;
      productCardDescription.innerText = article.description;
      verniceSelect.innerText = article.varnish;
     

      //---------Prix affiché en euros ---------
      article.price = article.price / 100;
      productCardPrice.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(article.price);

     //--------------affichè options varnish ------- 
     
      for (let i = 0; i < article.varnish.length; i++) {
        let option = document.createElement("option");
        document.querySelector("#vernice-select").appendChild(option);
        option.classList.add("varnish");
        option.innerText = article.varnish[i];
      }
    });
}


function AjoutPanier() {
  const AddToCartsBtn = document.querySelector(".ajouter-panier");
  const confirmation = document.querySelector(".ajouter-panier-confirmation");
  const textConfirmation = document.querySelector(".confirmation-text");

  AddToCartsBtn.addEventListener("click", () => {
    // if num est > 0 // num <100 
    if (numberObj.value > 0 && numberObj.value < 50) {

      // --- produit qui sera ajouté au panier ---------
      let productAdded = {
        _id: id,
        name: productCardName.innerText,
        price: parseFloat(productCardPrice.innerText.replace(/\s/g, "")),
        quantity: parseFloat(document.querySelector("#numero").value),
        totalPrice: parseFloat(productCardPrice.innerText.replace(/\s/g, "")) * parseFloat(document.querySelector("#numero").value)
      };
      
      // ------ LOCALSTORAGE ---------
      let arrayProductsInCart = [];

      // Sis le LOCALSTORAGE existe recupere son contenu on l'insere dans l' arrayProductsInCart, puis on le renvoit dans LOCALSTORAGE avec le produit ajouté
  
      // ---------sis le LOCALSTORAGE est vide, on le créé avec le produit ajouté---------
      if (localStorage.getItem("products") !== null) {
        arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
      }
      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

      //--------- calcul du total et mise dans le LocalStorage---------
      let sum = 0
      arrayProductsInCart.forEach(e => sum = sum + e.totalPrice)
      localStorage.setItem("total", sum);

      // ---------affichage---------
      confirmation.style.visibility = "visible";
      textConfirmation.innerText = `Vous avez ajouté ${numberObj.value} forniture a votre panier!`;
      setTimeout("location.reload(true);", 4000);
    } else {
      confirmation.style.visibility = "visible";
      textConfirmation.style.background = "red";
      textConfirmation.style.border = "red";
      textConfirmation.style.color = "white";
      textConfirmation.style.whiteSpace = "normal";
      textConfirmation.innerText = `La quantité doit être comprise entre 1 et 50.`;
    }
  });
}



