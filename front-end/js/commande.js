main();

function main() {

 displayCommandeEtTotalPrice();

}

function  displayCommandeEtTotalPrice(){
  const totalConfirmation = document.querySelectorAll("display.price");
  const commandeId = document.querySelector(".display-commandeId");

  totalConfirmation.innerText = localStorage.getItem("total");
  commandeId.innerText = localStorage.getItem("commandeId");

  // après on vide le panier pour recommencer a acheter
  localStorage.clear();
  
}
