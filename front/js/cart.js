const sectionCartItems = document.getElementById("cart__items");
// console.log(sectionCartItems);

const totalQuantity = document.getElementById("totalQuantity");
// console.log(totalQuantity);

const totalPrice = document.getElementById("totalPrice");
// console.log(totalPrice);

async function getKanap() {
    const response = await fetch("http://localhost:3000/api/products");
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.error);
    }
}

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

function numberWithSpace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function changeQuantity(id, color, value) {
    let kanap = getKanapCartInLocalStorage();
    let foundProduct = kanap.find((p) => p.id == id && p.color == color);
    if (foundProduct != undefined) {
        foundProduct.quantity = value;
    }
    saveKanapCartInLocalStorage(kanap);
}

function removeKanap(id, color) {
    let kanap = getKanapCartInLocalStorage();
    // console.log(kanap);

    let foundProduct = kanap.find((p) => p.id == id && p.color == color);
    // console.log(foundProduct);
    kanap = kanap.filter((p) => p != foundProduct);

    // console.log(kanap);
    saveKanapCartInLocalStorage(kanap);
}

function saveKanapCartInLocalStorage(kanap) {
    localStorage.setItem("kanapCart", JSON.stringify(kanap));
}

function totalQuantityy() {
    let kanap = getKanapCartInLocalStorage();
    number = 0;
    for (let product of kanap) {
        number = number + parseInt(product.quantity);
    }
    totalQuantity.innerText = number;
}

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

function loopDisplay(productCart, allProducts) {
    let fragment = document.createDocumentFragment();
    for (i = 0; i < productCart.length; i++) {
        // console.log(i);
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
    // sectionCartItems.appendChild(fragment);
}

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
email.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,3}$/i)) {
        emailErrorMsg.innerText = "Veuillez déclarer un Email correct";
        clientEmail = null;
    } else {
        emailErrorMsg.innerText = "";
        clientEmail = e.target.value;
    }
});

function formReset() {
    let formInput = document.querySelectorAll(
        ".cart__order__form__question > input"
    );
    // console.log(formInput);
    formInput.forEach((input) => (input.value = ""));
}

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
function postFunction() {
    post = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPost),
    };
    // console.log(post);
}

function fetchOrderPost() {
    fetch("http://localhost:3000/api/products/order", post)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.location.href = `./confirmation.html?orderId=${data.orderId}`;
        });
}

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

displayCart();
