

 displayCommandeEtTotalPrice();



function  displayCommandeEtTotalPrice(){
  const totalConfirmation = document.querySelector(".tot_price");
  const commandeId = document.querySelector(".orderId");
 
  totalConfirmation.innerText = localStorage.getItem("total");
  commandeId.innerText = localStorage.getItem("orderId");

}


 // après on vide le panier pour recommencer a acheter
 const btnCommande = document.querySelector(".commande");
 

  //suppression de la key "products" du LS pour vider entierament le panier  
  btnCommande.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();

    // ----alert panier vide 
    alert(" RECOMMENCER A ACHETER ");


    // ----Retour aux pages de produits 
    window.location.href = "index.html";
    });