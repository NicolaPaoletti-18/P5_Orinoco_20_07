let panier = document.querySelector(".panier-card__recap");
let copyLS = JSON.parse(localStorage.getItem("products"));
 

main ();

function main(){

  displayPanier();
  priceTotalPanier();
  toEmptyPanier();
  checkFormAndPostRequest();

}

function displayPanier(){
  let test = document.querySelector(".width-to-empty-panier");
  let panierCard = document.querySelector(".panier-card");
 

if(localStorage.getItem("products")){
  panierCard.style.display = "flex";
  panierCard.style.flexDirection = "column";
  panierCard.style.justifyContent = "space-around";
 
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
  productQuantity.innerHTML = copyLS[produit].quantity;

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
    }).format(copyLS[produit].price * copyLS[produit].quantity);
 
  }

}


function  priceTotalPanier() {
  let arrayOfPrice = [];
  let totalPrice = document.querySelector (".total");
  

  // Chaque prix du DOM dans un tableu 
  let productPriceAvecQuantity = document.querySelector(".price");
  console.log(productPriceAvecQuantity);
  for (let price in productPriceAvecQuantity) {
    arrayOfPrice.push(productPriceAvecQuantity.innerHTML);
    
  }

  // eliminer undefined du tableu 
  arrayOfPrice = arrayOfPrice.filter((el) =>{
    return el !=undefined;
  });

  // trasfrmer en nombre chaque valeur du tableu 
  arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));

  // sommer les valeurs pour avoir PRIXTOTAL 
  const reducer = ( accumulator, currentValue) => accumulator + currentValue;
  arrayOfPrice = arrayOfPrice.reduce(reducer);
 
  totalPrice.innerHTML = `Total : ${(arrayOfPrice = new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(arrayOfPrice))}`;
 
} 
  
function toEmptyPanier() {
  // Lorsque qu'on clique sur le btn, le panier se vide ainsi que le localStorage
  const btnToEmptyCart = document.querySelector(".to-empty-panier");
 

  //suppression de la key "products" du LS pour vider entierament le panier  
  btnToEmptyCart.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem("products");

    // ----alert panier vide 
    alert(" LE PANIER A' été VIDE  Retour aux pages de produits ");


    // ----Retour aux pages de produits 
    window.location.href = "index.html";
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
       // si form est valide, le tableu ProductsAchet contiendra l'objet qui sont (produit acheté), et order contiedra ce tableu et l'objet qui contient les infos User
   let productsBought = [];
   productsBought.push(copyLS);


  } else {
    erreur.innerText = "reseigner tous les champs! ERREUR";
    e.preventDefault();

   const order = {
     contact: {
       firstName: inputName.value,
       lastName: inputLastName.value,
       city: inputCity.value,
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

  let priceConfirmation = document.querySelector(".total").innerHTML;
  priceConfirmation = priceConfirmation.split(":");


  // ENOVIE de la requete avec l'en-tete. On chargera avec un localStorage qui ne contiendra plus que l'order id et le prix.
  fetch(" http://localhost:3000/api/furniture/order", options).then((response)=> response.json())
  .then((data) => {
    localStorage.clear();
    localStorage.setItem("commandeId", data.commandeId);
    localStorage.setItem("total", priceConfirmation[1]);
   

    window.location.href = "commande.html";
  })

  .catch((err) => {
    alert(" Il y a erreur : " + err );
  });

   }

 });

}


