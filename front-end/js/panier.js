let panier = document.querySelector(".panier-card__container");
let copyLS = JSON.parse(localStorage.getitem("products"));


main();

function main(){

  displayPanier();
  priceTotalPanier();
  toEmptyPanier();
  checkFormAndPostRequest();

}

function displayPanier(){
  let test = document.querySelector(".width-to-empty-panier");
  let panierCard = document.querySelector(".panier-card");
  let emptyPanier = document.querySelector(".if-empty-panier");

if(localStorage.getItem("products")){
  panierCard.style.display = "flex";
  panierCard.style.flexDirection = "column";
  panierCard.style.justifyContent = "space-around";
  emptyPanier.style.display = "none";
}


// Chaque objet dans le tableu copié du LS, on va a crée des divs de l'affichage du panier et on va à les remplit avec les données du tableu.
for( let produit in copyLS) {
  let productRow = document.createElement("div");
  panier.insertBefore(productRow, test);
  productRow.classList.add("panier-card__row");

  let productName = document.createElement("div");
  productRow.appendChild(productName);
  productName.classList.add("panier-card__title");
  productName.innerHTML = copyLS[produit].name;
  
  let productQuantity = document.createElement("div");
  productRow.appendChild(productQuantity);
  productQuantity.classList.add("panier-card__title", "title-quantity");
  productQuantity.innerHTML = copyLS[produit].name;

  let productPrice = document.createElement("div");
  productRow.appendChild(productPrice);
  productPrice.classList.add(
    "panier-card__title",
    "data-price",
    "price"
  );


    // Affichage du prix  €
    productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(copyOfLS[produits].price * copyOfLS[produits].quantity);
 
  }

}


function  priceTotalPanier() {
  let arrayOfPrice = [];
  let totalPrice = document.querySelector (".total");

  // Chaque prix du DOM dans un tableu 
  let productPriceAvecQuantity = document.querySelector(".price");

  for (let price in productPriceAvecQuantity) {
    arrayOfPrice.push(productPriceAvecQuantity[price].innerHTML);
  }

  // eliminer undefined du tableu 
  arrayOfPrice = arrayOfPrice.filter((el) =>{
    return el !=undefined;
  });

  // trasfrmer en nombre chaque valeur du tableu 
  arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));

  // sommer les valeurs pour avoir PRIXTOTAL 
  const reducer = ( acc, currentVal) => acc + currentVal;
  arrayOfPrice = arrayOfPrice.reduce(reducer);

  totalPrice.innerText = `Total : ${(arrayOfPrice = new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(arrayOfPrice))}`;
}
  
function toEmptyPanier() {
// on clique sur le btn, le panier se vide ainsi le LS 

const buttonToEmptyPanier = document.querySelector(".to-empty-panier");
buttonToEmptyPanier.addEventListener("click",() =>{
  localStorage.clear();
  });
}
function checkFormAndPostRequest() {

  // Inputs récupère dans le DOM. 
  const submit = document.querySelector("#submit");
  let inputName = document.querySelector("#name");
  let inputLastName = document.querySelector("#lastname");
  let inputPostal = document.querySelector("#postal");
  let inputCity = document.querySelector("#city");
  let inputAdress = document.querySelector("#adress");
  let inputMail = document.querySelector("#phone");
  let erreur = document.querySelector(".erreur");

// check lors si apres le clic, si l'un des champs n'est pas rempli, on affiche une erreur. Aussi on verifie que dans le nombre il y a un nombre sinon erreur.

submit.addEventListener("click", (e) => {
  if (
    !inputName.value ||
    !inputLastName.value ||
    !inputPostal.value ||
    !inputCity.value ||
    !inputAdress.value ||
    !inputMail.value ||
    !inputPhone.value 
  ) {
    erreur.innerText = "reseigner tous les champs! ERREUR";
    e.preventDefault();
  } else if (isNaN(inputPhone.value)) {
    e.preventDefault();
    erreur.innerText = "Votre numéero n'est pas valide";
  } else {
   // si form est valide, le tableu ProductsAchet contiendra l'objet qui sont (produit acheté), et order contiedra ce tableu et l'bjet qui contient les infos User
   let productsBought = [];
   productsBought.push(copyLS);

   const order = {
     contact: {
       firstName: inputName.value,
       lastName: inputLastName.value,
       city:inputCity.value,
       address: inputAdress.value,
       email: inputMail.value,
     },
     products: productsBought,
   };


   //   ENVOI LE RAQUETE POST AU BACK-END 

   // CREATION REQUETE 
   const options = {
     method: "POST",
     body: JSON.stringify(order),
     headers: {"Content-Type":"application/json"},
   };

  // PRIX DOmandé pour la page commande 

  let priceConfirmation = document.querySelector(".total").innerText;
  priceConfirmation = priceConfirmation.split(":");


  // ENOVIE de la requete avec l'en-tete. On chargera avec un localStorage qui ne contiendra plus que l'order id et le prix.
  fetch(" http://localhost:3000/api/furniture/order", options).then((response)=> response.json())
  .then((data) => {
    localStorage.clear();
    localStorage.setItem("commandeId", data.commandeId);
    localStorage.setItem("total", priceConfirmation[1]);
   

    document.location.href = "commande.html";
  })

  .catch((err) => {
    alert(" Il y a erreur : " + err );
  });

   }

 });

}


