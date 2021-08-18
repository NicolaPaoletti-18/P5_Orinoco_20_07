
  getArticles();


// Récupérer les articles depuis l'API
function getArticles() {
  fetch("  http://localhost:3000/api/furniture")
    .then(function (rep) {
      return rep.json();
    })
    .catch((error) => {
      let productsContainer = document.querySelector(".productes-container");
      productsContainer.innerHTML =
      "<p>Nous n'avons pas réussi à afficher la page</p>";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "60px 0";
      productsContainer.style.margin = "auto";
    })

    //  données de chaque produit (prix, nom,id,price) dans le DOM
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      console.log(articles);
      for (let article in articles) {
      
        let productLink = document.createElement("a");
        document.querySelector(".productes-container").appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[article]._id}`;
        productLink.classList.add("product");
        productLink.style.height = "min-content";

        let productCard = document.createElement("div");
        productLink.appendChild(productCard);
        productCard.classList.add("product-Card");


        let productImgDiv = document.createElement("div");
        productCard.appendChild(productImgDiv);
        productImgDiv.classList.add("card__img");
        

        let productImg = document.createElement("img");
        productImgDiv.appendChild(productImg);
        productImg.style.height = "200px";
        productImg.style.width = "300px";
        productImg.src = resultatAPI[article].imageUrl;

        let productInfosDiv = document.createElement("div");
        productCard.appendChild(productInfosDiv);
        productInfosDiv.classList.add("card__infos");

        let productInfoTitle = document.createElement("div");
        productInfosDiv.appendChild(productInfoTitle);
        productInfoTitle.classList.add("card__infos__title");
        productInfoTitle.innerHTML = resultatAPI[article].name;

        let productInfoPrice = document.createElement("div");
        productInfosDiv.appendChild(productInfoPrice);
        productInfoPrice.classList.add("card__infos__price");

        // afficher en euros
        resultatAPI[article].price = resultatAPI[article].price / 100;
        productInfoPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(resultatAPI[article].price);
      }
    });
}