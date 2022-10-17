const sectionCartItems = document.getElementById("cart__items");
// console.log(sectionCartItems);

const totalQuantity = document.getElementById("totalQuantity");
// console.log(totalQuantity);

const totalPrice = document.getElementById("totalPrice");
// console.log(totalPrice);

// Va chercher et stocke tous les produits de l'API products
async function getKanap() {
    const response = await fetch("http://localhost:3000/api/products");
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.error);
    }
}

// Va cherche les éléments de la clef "kanapCart" depuis le local storage et les stockes
function getKanapCartInLocalStorage() {
    let kanap = localStorage.getItem("kanapCart");
    if (kanap == null) {
        console.log("panier vide");
        kanapCart = [];
        localStorage.setItem("kanapCart", JSON.stringify(kanapCart));
    } else {
        console.log("panier chargé");
        return JSON.parse(kanap);
    }
}
// Ajoute des séparateurs dans le nombre
function numberWithSpace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Change la quantité du produit correspondant (id et couleur) dans le local storage
function changeQuantity(id, color, value) {
    let kanap = getKanapCartInLocalStorage();
    let foundProduct = kanap.find((p) => p.id == id && p.color == color);
    if (foundProduct != undefined) {
        foundProduct.quantity = value;
    }
    saveKanapCartInLocalStorage(kanap);
}

// Supprime le produit correspondant (id et couleur) dans le local storage
function removeKanap(id, color) {
    let kanap = getKanapCartInLocalStorage();
    // console.log(kanap);

    let foundProduct = kanap.find((p) => p.id == id && p.color == color);
    // console.log(foundProduct);
    kanap = kanap.filter((p) => p != foundProduct);

    // console.log(kanap);
    saveKanapCartInLocalStorage(kanap);
}

// Envoi les données dans le local storage
function saveKanapCartInLocalStorage(kanap) {
    localStorage.setItem("kanapCart", JSON.stringify(kanap));
}

// Donne et affiche la quantité total des produits qui sont dans le local storage et les affiches dynamiquement
function totalQuantityy() {
    let kanap = getKanapCartInLocalStorage();
    number = 0;
    for (let product of kanap) {
        number = number + parseInt(product.quantity);
    }
    totalQuantity.innerText = number;
}

// Donne et affiche le prix total des produits qui sont dans le local storage et les affiches dynamiquement
function totalPricee(allProducts) {
    let kanap = getKanapCartInLocalStorage();
    // console.log(kanap.length);
    total = 0;

    if (kanap.length == 0) {
        total = 0;
        totalPrice.innerText = total;
    } else {
        for (j = 0; j < kanap.length; j++) {
            let objectPorductFullForPrice = allProducts.find(
                (p) => p._id == kanap[j].id
            );
            total += kanap[j].quantity * objectPorductFullForPrice.price;

            totalPrice.innerText = total;
        }
    }
}

// Change (affichage et stockage) la quantité du produit quand l'input est changé par l'utilisateur
function changeQuantityCart(allProducts) {
    let inputNumber = document.querySelectorAll(".itemQuantity");
    let pQuantity = document.querySelectorAll(
        ".cart__item__content__settings__quantity > p"
    );
    let pQuantityFinal = pQuantity[i];

    inputNumber[i].addEventListener("change", (e) => {
        let article = e.target.closest("article");
        let id = article.dataset.id;
        let color = article.dataset.color;
        let newQte = e.target.value;
        if (e.target.value > 100) {
            window.alert("La quantité max est de 100");
            e.target.value = 100;
            newQte = 100;
        } else if (e.target.value < 1) {
            removeKanap(id, color);
            article.remove();
        }
        pQuantityFinal.innerText = `Qté : ${newQte}`;
        changeQuantity(id, color, newQte);
        totalQuantityy();
        totalPricee(allProducts);
    });
}

// Supprime (affichage et stockage) le produit quand l'input est clické par l'utilisateur
function deleteItemCart(allProducts) {
    let deleteBtn = document.querySelectorAll(".deleteItem");

    deleteBtn[i].addEventListener("click", (e) => {
        let article = e.target.closest("article");
        let id = article.dataset.id;
        let color = article.dataset.color;

        removeKanap(id, color);
        article.remove();

        totalQuantityy();
        totalPricee(allProducts);
    });
}

// Affiche sur la page les produits qui sont dans stocké dans le localstorage
function loopDisplay(productCart, allProducts) {
    let fragment = document.createDocumentFragment();
    for (i = 0; i < productCart.length; i++) {
        let objectPorductFull = allProducts.find(
            (p) => p._id == productCart[i].id
        );
        let article = document.createElement("article");
        article.className = "cart__item";
        article.dataset.id = productCart[i].id;
        article.dataset.color = productCart[i].color;
        article.innerHTML = `
        <div class="cart__item__img">
        <img src=${objectPorductFull.imageUrl} alt="${
            objectPorductFull.altTxt
        }">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${objectPorductFull.name}</h2>
        <p>${productCart[i].color}</p>
        <p>${numberWithSpace(objectPorductFull.price)} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : ${productCart[i].quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            productCart[i].quantity
        }">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        `;
        fragment.appendChild(article);
        sectionCartItems.appendChild(fragment);

        changeQuantityCart(allProducts);
        deleteItemCart(allProducts);
    }
}

// Fonction joué au chargement de la page, elle joue les fonctions d'affichage des produits, quantité et prix
async function displayCart() {
    let productCart = await getKanapCartInLocalStorage();
    let allProducts = await getKanap();
    loopDisplay(productCart, allProducts);
    totalQuantityy();
    totalPricee(allProducts);
}

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// console.log(firstNameErrorMsg);
let clientFirstName = "";
// Check les informations dans l'input avec un regex
firstName.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[a-zA-Z_'.-]*$/)) {
        firstNameErrorMsg.innerText = "Veuillez déclarer un Prénom correct";
        clientFirstName = null;
    } else {
        firstNameErrorMsg.innerText = "";
        clientFirstName = e.target.value;
    }
});

let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
// console.log(lastNameErrorMsg);
let clientLastName = "";
// Check les informations dans l'input avec un regex
lastName.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[a-zA-Z_'.-]*$/)) {
        lastNameErrorMsg.innerText = "Veuillez déclarer un Nom correct";
        clientLastName = null;
    } else {
        lastNameErrorMsg.innerText = "";
        clientLastName = e.target.value;
    }
});

let addressErrorMsg = document.getElementById("addressErrorMsg");
// console.log(addressErrorMsg);
let clientAdresse = "";
// Check les informations dans l'input avec un regex
address.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[0-9]*[a-zA-Z\s,'.-]*$/)) {
        addressErrorMsg.innerText = "Veuillez déclarer une Adresse correct";
        clientAdresse = null;
    } else {
        addressErrorMsg.innerText = "";
        clientAdresse = e.target.value;
    }
});

let cityErrorMsg = document.getElementById("cityErrorMsg");
// console.log(cityErrorMsg);
let clientCity = "";
// Check les informations dans l'input avec un regex
city.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[a-zA-Z\s_'.-]*$/)) {
        cityErrorMsg.innerText = "Veuillez déclarer ue Ville correct";
        clientCity = null;
    } else {
        cityErrorMsg.innerText = "";
        clientCity = e.target.value;
    }
});

let emailErrorMsg = document.getElementById("emailErrorMsg");
// console.log(emailErrorMsg);
let clientEmail = "";
// Check les informations dans l'input avec un regex
email.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,3}$/i)) {
        emailErrorMsg.innerText = "Veuillez déclarer un Email correct";
        clientEmail = null;
    } else {
        emailErrorMsg.innerText = "";
        clientEmail = e.target.value;
    }
});

// Reset le formulaire une fois qu'il est soumis
function formReset() {
    let formInput = document.querySelectorAll(
        ".cart__order__form__question > input"
    );
    // console.log(formInput);
    formInput.forEach((input) => (input.value = ""));
}

// Récupérer et stocker dans un tableau les id des élement dans le local storage
function takeIdElementOnLocalStorage() {
    let productCart = getKanapCartInLocalStorage();
    // console.log(productCart);
    arrayProducts = [];

    for (i = 0; productCart.length > i; i++) {
        arrayProducts.push(productCart[i].id);
    }
    // console.log(arrayProducts);
}

let dataPost = {};
// Crée un objet avec les données du formulaire (objet) et les id des produits de la commande (tableau)
function dataPostFucntion() {
    dataPost = {
        contact: {
            firstName: clientFirstName,
            lastName: clientLastName,
            address: clientAdresse,
            city: clientCity,
            email: clientEmail,
        },
        products: arrayProducts,
    };
    // console.log(dataPost);
}

let post = {};
// Fonction methode POST
function postFunction() {
    post = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPost),
    };
    // console.log(post);
}

// Envoi les données attendu par l'API products/order et récupère la réponse (orderId) et envoi sur la page de confirmation de commande
function fetchOrderPost() {
    fetch("http://localhost:3000/api/products/order", post)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.location.href = `./confirmation.html?orderId=${data.orderId}`;
        });
}

// Fonction qui vérifie si le pannier existe et que le formulaire est valide. Si les vérifications sont acceptées alors il joue les fonctions appelées
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let kanap = getKanapCartInLocalStorage();
    if (kanap.length == 0 || kanap == false) {
        window.alert(
            "Il n'y a aucun article dans le panier ! Vous devez séléctionner au moins un article pour passer une commande."
        );
    } else {
        if (
            clientFirstName &&
            clientLastName &&
            clientAdresse &&
            clientCity &&
            clientEmail
        ) {
            formReset();
            takeIdElementOnLocalStorage();
            dataPostFucntion();
            // console.log(dataPost);
            postFunction();
            // console.log(post);
            fetchOrderPost();
        }
    }
});

//Joue la fonction au chargement la page
displayCart();
