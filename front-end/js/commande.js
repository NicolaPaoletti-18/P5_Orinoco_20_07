

 displayCommandeEtTotalPrice();



function  displayCommandeEtTotalPrice(){
  const totalConfirmation = document.querySelector(".tot_price");
  const commandeId = document.querySelector(".orderId");
 
  totalConfirmation.innerText = localStorage.getItem("total");
  commandeId.innerText = localStorage.getItem("orderId");
  
  localStorage.clear();

}


 // après on vide le panier pour recommencer a acheter
 const btnCommande = document.querySelector(".back_to_home");
 

  //suppression de la key "products" du LS pour vider entierament le panier  
  btnCommande.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();

    // ----alert panier vide 
    alert("Retour à la page d'accueil");


    // ----Retour aux pages de produits 
    window.location.href = "index.html";
    });