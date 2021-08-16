main();

function main() {

 displayCommandeEtTotalPrice();

}

function  displayCommandeEtTotalPrice(){
  const totalConfirmation = document.querySelector("display-price span");
  const commandeId = document.querySelector(".display-commandeId span");
 
  totalConfirmation.innerText = localStorage.getItem("total");
  commandeId.innerText = localStorage.getItem("commandeId");

  // après on vide le panier pour recommencer a acheter
  localStorage.clear();
  
}
