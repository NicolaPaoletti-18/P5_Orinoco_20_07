let panier = document.querySelector(".panier-card__recap");
let copyLS = JSON.parse(localStorage.getItem("products"));


main ();

function main(){

  displayPanier();
  priceTotalPanier();
  toEmptyPanier();
  checkFormAndPostRequest();

}

function displayPanier() {
  let test = document.querySelector(".width-to-empty-panier");
  let panierCard = document.querySelector(".panier-card");

  if (localStorage.getItem("products")) {
    panierCard.style.display = "flex";
    panierCard.style.flexDirection = "column";
    panierCard.style.justifyContent = "space-around";
  }

  // Chaque objet dans le tableu copié du LS, on va a crée des divs de l'affichage du panier et on va à les remplit avec les données du tableu.
  for (let produit in copyLS) {
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
    }).format(copyLS[produit].totalPrice);
  }
}


function priceTotalPanier() {
  //let arrayOfPrice = [];
  let totalPrice = document.querySelector(".total");
  let totalLS = JSON.parse(localStorage.getItem("total"));

  totalPrice.innerHTML = 'Total : ' + new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(totalLS);
}




  
  
function toEmptyPanier() {
  // Lorsque qu'on clique sur le btn, le panier se vide ainsi que le localStorage
  const btnToEmptyCart = document.querySelector(".to-empty-panier");
 

  //suppression de la key "products" du LS pour vider entierament le panier  
  btnToEmptyCart.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();

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
  let inputMail = document.querySelector("#mail");
  let inputPhone = document.querySelector("#phone");
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
    erreur.innerHTML = "Vous devez renseigner tous les champs !";
    e.preventDefault();
  } else if (isNaN(inputPhone.value)) {
    e.preventDefault();
    erreur.innerText = "Votre numéro de téléphone n'est pas valide";
  } else {

    // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
    let productsBought = [];
    productsBought.push(copyLS);
    
   
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

    // -------  Envoi de la requête POST au back-end --------
    // Création de l'entête de la requête
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    };

    // Préparation du prix formaté pour l'afficher sur la prochaine page
    let priceConfirmation = document.querySelector(".total").innerText;
    priceConfirmation = priceConfirmation.split(" :");

    // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
    fetch("http://localhost:3000/api/furniture/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        
        localStorage.setItem("orderId", data.orderId);
        localStorage.setItem("total", priceConfirmation[1]);

        //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
         window.location.href = "commande.html";
      })
      .catch((err) => {
        alert("Il y a eu une erreur : " + err);
      });
  }
});


}
