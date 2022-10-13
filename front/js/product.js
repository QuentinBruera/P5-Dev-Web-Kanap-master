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

// Récupère le kanap en fonction de son ID dans l'API
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

// Affiche les informations du kanap
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

    saveKanapCartInLocalStorage() {
        localStorage.setItem("kanapCart", JSON.stringify(this.kanap));
    }

    addKanap(productCart) {
        let foundProduct = this.kanap.find(
            (p) => p.id == productCart.id && p.color == productCart.color
        );
        if (
            kanapQuantity.value > 0 &&
            kanapColorChoice.options[kanapColorChoice.selectedIndex].value != ""
        ) {
            if (foundProduct != undefined) {
                foundProduct.quantity =
                    parseInt(foundProduct.quantity) +
                    parseInt(kanapQuantity.value);
                // console.log(foundProduct.color);
                if (foundProduct.quantity > 100) {
                    window.alert(
                        "Votre panier a atteint la quantité maximale de 100 articles pour cette couleur."
                    );
                    foundProduct.quantity = 100;
                    kanapQuantity.value = 100;
                }
            } else {
                this.kanap.push(productCart);
            }
        } else {
            window.alert(
                "Veuillez choisir une couleur et un nombre d'article(s) (1-100)"
            );
        }

        this.saveKanapCartInLocalStorage();
    }

    removeKanap(productCart) {
        this.kanap = this.kanap.filter(
            (p) => p.id != productCart.id && p.color != productCart.color
        );
        this.saveKanapCartInLocalStorage();
    }

    changeQuantity(productCart, quantity) {
        console.log("je joue");
        let foundProduct = this.kanap.find(
            (p) => p.id == productCart.id && p.color == productCart.color
        );
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                this.removeKanap(foundProduct);
            } else {
                this.saveKanapCartInLocalStorage();
            }
        }
    }
}

btnAddToCart.addEventListener("click", () => {
    let productCart = new Kanap();
    productCart.addKanap({
        id: id,
        color: kanapColorChoice.options[kanapColorChoice.selectedIndex].value,
        quantity: kanapQuantity.value,
    });
});

//
// function saveKanapCartInLocalStorage(kanap) {
//     localStorage.setItem("kanapCart", JSON.stringify(kanap));
// }

// function getKanapCartInLocalStorage() {
//     let kanap = localStorage.getItem("kanapCart");
//     if (kanap == null) {
//         return [];
//     } else {
//         return JSON.parse(kanap);
//     }
// }

// function addKanap(productCart) {
//     let kanap = getKanapCartInLocalStorage();
//     let foundProduct = kanap.find(
//         (p) => p.id == productCart.id && p.color == productCart.color
//     );
//     if (foundProduct != undefined) {
//         foundProduct.quantity++;
//     } else {
//         productCart.quantity = 1;
//         kanap.push(productCart);
//     }
//     saveKanapCartInLocalStorage(kanap);
// }

// function removeKanap(productCart) {
//     let kanap = getKanapCartInLocalStorage();
//     kanap = kanap.filter(
//         (p) => p.id != productCart.id && p.color != productCart.color
//     );
//     saveKanapCartInLocalStorage(kanap);
// }

// function changeQuantity(productCart, quantity) {
//     let kanap = getKanapCartInLocalStorage();
//     let foundProduct = kanap.find(
//         (p) => p.id == productCart.id && p.color == productCart.color
//     );
//     if (foundProduct != undefined) {
//         foundProduct.quantity += quantity;
//         saveKanapCartInLocalStorage(kanap);
//         if (foundProduct.quantity <= 0) {
//             removeKanap(foundProduct);
//         } else {
//             saveKanapCartInLocalStorage(kanap);
//         }
//     }
// }

// function getNumberProduct() {
//     let kanap = getKanapCartInLocalStorage();
//     let number = 0;
//     for (let product of kanap) {
//         number += product.quantity;
//     }
//     return number;
// }

// function getTotalPrice() {
//     let kanap = getKanapCartInLocalStorage();
//     let total = 0;
//     for (let product of kanap) {
//         total += product.quantity * product.price;
//     }
//     return total;
// }

//
//
//
//

displayInfo();
