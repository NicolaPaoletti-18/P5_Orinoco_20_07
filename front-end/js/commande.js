

 displayCommandeEtTotalPrice();



function  displayCommandeEtTotalPrice(){
  const totalConfirmation = document.querySelector("display-price span");
  const commandeId = document.querySelector(".display-orderId span");
 
  totalConfirmation.innerText = localStorage.getItem("total");
  commandeId.innerText = localStorage.getItem("orderId");

  // après on vide le panier pour recommencer a acheter
  localStorage.clear();
  
}
