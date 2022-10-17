const url = new URL(window.location);
const id = url.searchParams.get("id");
// console.log(id);

const kanapImg = document.querySelector(".item__img");
// console.log(itemImg);

const kanapName = document.getElementById("title");
// console.log(title);

const kanapPrice = document.getElementById("price");
// console.log(kanapPrice);

const kanapDescription = document.getElementById("description");
// console.log(kanapDescription);

const kanapColorChoice = document.getElementById("colors");
// console.log(kanapColorChoice);

const kanapQuantity = document.getElementById("quantity");
// console.log(kanapQuantity);

const btnAddToCart = document.getElementById("addToCart");
// console.log(btnAddToCart);

// Va chercher et stocke le produit en fonction de son ID dans l'API products
async function getKanap(idKanap) {
    const response = await fetch(
        "http://localhost:3000/api/products/" + idKanap
    );
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.error);
    }
}

// Ajoute des séparateurs dans le nombre
function numberWithSpace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Affiche les informations du produit depuis l'API
async function displayInfo() {
    let product = await getKanap(id);
    kanapImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    kanapName.innerText = product.name;
    kanapPrice.innerText = numberWithSpace(product.price);
    kanapDescription.innerText = product.description;
    for (i = 0; i < product.colors.length; i++) {
        kanapColorChoice.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>
        `;
    }
    // console.log(product);
}

class Kanap {
    constructor() {
        let kanap = localStorage.getItem("kanapCart");
        if (kanap == null) {
            // console.log("kanap = null");
            this.kanap = [];
        } else {
            this.kanap = JSON.parse(kanap);
        }
    }

    // Envoi les données dans le local storage
    saveKanapCartInLocalStorage() {
        localStorage.setItem("kanapCart", JSON.stringify(this.kanap));
    }

    // Check les données avant de les envoyer dans le local storage
    addKanap(productCart) {
        // Check si un élément avec le même id & color existe déjà dans le local storage
        let foundProduct = this.kanap.find(
            (p) => p.id == productCart.id && p.color == productCart.color
        );
        // Check si une quantité et une couleur ont étaient sélectionné par l'utilisateur
        if (
            kanapQuantity.value > 0 &&
            // kanapQuantity.value < 101 &&
            kanapColorChoice.options[kanapColorChoice.selectedIndex].value != ""
        ) {
            // Si l'élément existe déjà dans le local storage il y sera mis à jour
            if (foundProduct != undefined) {
                foundProduct.quantity =
                    parseInt(foundProduct.quantity) +
                    parseInt(kanapQuantity.value);
                // console.log(foundProduct.color);
                if (foundProduct.quantity > 100) {
                    window.alert(
                        "Votre panier comporte 100 articles avec ces options et vous ne pouvez pas en ajouter d'avantage."
                    );
                    foundProduct.quantity = 100;
                    kanapQuantity.value = 100;
                } else {
                    window.alert(
                        `Votre panier comporte ${foundProduct.quantity} articles avec ces options.`
                    );
                }
                // Si l"élément n'existe pas dans le local storage il y sera ajouté
            } else {
                if (kanapQuantity.value > 100) {
                    productCart.quantity = 100;
                    this.kanap.push(productCart);
                    kanapQuantity.value = 100;
                    window.alert(
                        "100 articles ont étaient ajoutés au panier et vous ne pouvez pas en ajouter d'avantage."
                    );
                } else {
                    this.kanap.push(productCart);
                    window.alert(
                        `Votre panier comporte ${productCart.quantity} articles avec ces options.`
                    );
                }
            }
        } else {
            window.alert(
                "Veuillez choisir une couleur et un nombre d'article(s) (1-100)"
            );
        }

        this.saveKanapCartInLocalStorage();
    }
}

// Utilise la class Kanap avec les données dans les inputs quand on clic sur le bouton "Ajouter au panier"
btnAddToCart.addEventListener("click", () => {
    let productCart = new Kanap();
    productCart.addKanap({
        id: id,
        color: kanapColorChoice.options[kanapColorChoice.selectedIndex].value,
        quantity: kanapQuantity.value,
    });
});

//Joue la fonction au chargement la page
displayInfo();
