// const sectionCartItems = document.getElementById("cart__items");
// // console.log(sectionCartItems);

// async function getKanap() {
//     const response = await fetch("http://localhost:3000/api/products");
//     if (response.ok) {
//         return response.json();
//     } else {
//         console.log(response.error);
//     }
// }

// function getKanapCartInLocalStorage() {
//     let kanap = localStorage.getItem("kanapCart");
//     if (kanap == null) {
//         console.log("panier vide");
//         // return [];
//     } else {
//         console.log("panier chargé");
//         return JSON.parse(kanap);
//     }
// }

// function numberWithSpace(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// }

// function saveKanapCartInLocalStorage(kanap) {
//     localStorage.setItem("kanapCart", JSON.stringify(kanap));
// }

// function changeQuantity(id, color, value) {
//     let kanap = getKanapCartInLocalStorage();
//     let foundProduct = kanap.find((p) => p.id == id && p.color == color);
//     if (foundProduct != undefined) {
//         foundProduct.quantity = value;
//         saveKanapCartInLocalStorage(kanap);
//         if (foundProduct.quantity <= 0) {
//             removeKanap(foundProduct);
//         } else {
//             saveKanapCartInLocalStorage(kanap);
//         }
//     }
// }

// function removeKanap(id, color) {
//     let kanap = getKanapCartInLocalStorage();
//     console.log(kanap);

//     let foundProduct = kanap.find((p) => p.id == id && p.color == color);
//     console.log(foundProduct);
//     kanap = kanap.filter((p) => p != foundProduct);

//     console.log(kanap);
//     saveKanapCartInLocalStorage(kanap);
// }

// async function displayCart() {
//     let productCart = await getKanapCartInLocalStorage();
//     let allProducts = await getKanap();
//     console.log(allProducts);
//     let fragment = document.createDocumentFragment();
//     for (i = 0; i < productCart.length; i++) {
//         console.log(i);
//         let objectPorductFull = allProducts.find(
//             (p) => p._id == productCart[i].id
//         );
//         let article = document.createElement("article");
//         article.className = "cart__item";
//         article.dataset.id = productCart[i].id;
//         article.dataset.color = productCart[i].color;
//         article.innerHTML = `
//         <div class="cart__item__img">
//         <img src=${objectPorductFull.imageUrl} alt="${
//             objectPorductFull.altTxt
//         }">
//         </div>
//         <div class="cart__item__content">
//         <div class="cart__item__content__description">
//         <h2>${objectPorductFull.name}</h2>
//         <p>${productCart[i].color}</p>
//         <p>${numberWithSpace(objectPorductFull.price)} €</p>
//         </div>
//         <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//         <p>Qté : ${productCart[i].quantity}</p>
//         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
//             productCart[i].quantity
//         }">
//         </div>
//         <div class="cart__item__content__settings__delete">
//         <p class="deleteItem">Supprimer</p>
//         </div>
//         </div>
//         </div>
//         `;
//         fragment.appendChild(article);
//         sectionCartItems.appendChild(fragment);

//         let inputNumber = document.querySelectorAll(".itemQuantity");
//         let pQuantity = document.querySelectorAll(
//             ".cart__item__content__settings__quantity > p"
//         );
//         let pQuantityFinal = pQuantity[i];
//         console.log(pQuantity[i]);
//         let articleByClass = document.querySelectorAll(".cart__item");
//         console.log(articleByClass[i].dataset.id);
//         let articleDatasetId = articleByClass[i].dataset.id;
//         let articleDatasetColor = articleByClass[i].dataset.color;

//         inputNumber[i].addEventListener("change", (e) => {
//             pQuantityFinal.innerText = `Qté : ${e.target.value}`;
//             changeQuantity(
//                 articleDatasetId,
//                 articleDatasetColor,
//                 e.target.value
//             );
//         });

//         let deleteBtn = document.querySelectorAll(".deleteItem");

//         deleteBtn[i].addEventListener("click", () => {
//             removeKanap(articleDatasetId, articleDatasetColor);
//             console.log(articleDatasetId);
//             console.log(articleDatasetColor);
//             // productCart = productCart.filter((z) => z[i] != article[i]);
//         });
//     }
// }

// displayCart();

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// const sectionCartItems = document.getElementById("cart__items");

// async function getKanap() {
//     const response = await fetch("http://localhost:3000/api/products");
//     if (response.ok) {
//         return response.json();
//     } else {
//         console.log(response.error);
//     }
// }

// function getKanapCartInLocalStorage() {
//     let kanap = localStorage.getItem("kanapCart");
//     if (kanap == null) {
//         console.log("panier vide");
//         // return [];
//     } else {
//         console.log("panier chargé");
//         return JSON.parse(kanap);
//     }
// }

// function numberWithSpace(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// }
// class Cart {
//     constructor() {
//         let kanap = localStorage.getItem("kanapCart");
//         if (kanap == null) {
//             console.log("panier vide");
//             // return [];
//         } else {
//             console.log("panier chargé");
//             return JSON.parse(this.kanap);
//         }
//         let response = fetch("http://localhost:3000/api/products");
//         if (response.ok) {
//             return response.json();
//         } else {
//             console.log(response.error);
//         }
//     }

//     changeQuantity(id, color, value) {
//         // let kanap = getKanapCartInLocalStorage();
//         let foundProduct = this.kanap.find(
//             (p) => p.id == id && p.color == color
//         );
//         if (foundProduct != undefined) {
//             foundProduct.quantity = value;
//             saveKanapCartInLocalStorage(kanap);
//             if (foundProduct.quantity <= 0) {
//                 this.removeKanap(foundProduct);
//             } else {
//                 this.saveKanapCartInLocalStorage();
//             }
//         }
//     }

//     removeKanap(id, color) {

//         let foundProduct = this.kanap.find((p) => p.id == id && p.color == color);
//         console.log(foundProduct);
//         kanap = this.kanap.filter((p) => p != foundProduct);

//         console.log(kanap);
//         saveKanapCartInLocalStorage(kanap);
//     }

//     saveKanapCartInLocalStorage() {
//         localStorage.setItem("kanapCart", JSON.stringify(this.kanap));
//     }
// }

// // console.log(sectionCartItems);

// async function displayCart() {
//     let productCart = await getKanapCartInLocalStorage();
//     let allProducts = await getKanap();
//     console.log(allProducts);
//     let fragment = document.createDocumentFragment();
//     for (i = 0; i < productCart.length; i++) {
//         console.log(i);
//         let objectPorductFull = allProducts.find(
//             (p) => p._id == productCart[i].id
//         );
//         let article = document.createElement("article");
//         article.className = "cart__item";
//         article.dataset.id = productCart[i].id;
//         article.dataset.color = productCart[i].color;
//         article.innerHTML = `
//         <div class="cart__item__img">
//         <img src=${objectPorductFull.imageUrl} alt="${
//             objectPorductFull.altTxt
//         }">
//         </div>
//         <div class="cart__item__content">
//         <div class="cart__item__content__description">
//         <h2>${objectPorductFull.name}</h2>
//         <p>${productCart[i].color}</p>
//         <p>${numberWithSpace(objectPorductFull.price)} €</p>
//         </div>
//         <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//         <p>Qté : ${productCart[i].quantity}</p>
//         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
//             productCart[i].quantity
//         }">
//         </div>
//         <div class="cart__item__content__settings__delete">
//         <p class="deleteItem">Supprimer</p>
//         </div>
//         </div>
//         </div>
//         `;
//         fragment.appendChild(article);
//         sectionCartItems.appendChild(fragment);

//         let inputNumber = document.querySelectorAll(".itemQuantity");
//         let pQuantity = document.querySelectorAll(
//             ".cart__item__content__settings__quantity > p"
//         );
//         let pQuantityFinal = pQuantity[i];
//         console.log(pQuantity[i]);
//         let articleByClass = document.querySelectorAll(".cart__item");
//         console.log(articleByClass[i].dataset.id);
//         let articleDatasetId = articleByClass[i].dataset.id;
//         let articleDatasetColor = articleByClass[i].dataset.color;

//         inputNumber[i].addEventListener("change", (e) => {
//             pQuantityFinal.innerText = `Qté : ${e.target.value}`;
//             changeQuantity(
//                 articleDatasetId,
//                 articleDatasetColor,
//                 e.target.value
//             );
//         });

//         let deleteBtn = document.querySelectorAll(".deleteItem");

//         deleteBtn[i].addEventListener("click", () => {
//             removeKanap(articleDatasetId, articleDatasetColor);
//             console.log(articleDatasetId);
//             console.log(articleDatasetColor);
//             // productCart = productCart.filter((z) => z[i] != article[i]);
//         });
//     }
// }

// displayCart();
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
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
        // return [];
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
        // if (value > 100) {
        //     foundProduct.quantity = 100;
        // } else {
        //     foundProduct.quantity = value;
        // }

        // saveKanapCartInLocalStorage(kanap);
        // if (foundProduct.quantity <= 0) {
        //     removeKanap(foundProduct);
        // } else {
        //     // saveKanapCartInLocalStorage(kanap);
        // }
    }
    saveKanapCartInLocalStorage(kanap);
}

function removeKanap(id, color) {
    let kanap = getKanapCartInLocalStorage();
    console.log(kanap);

    let foundProduct = kanap.find((p) => p.id == id && p.color == color);
    console.log(foundProduct);
    kanap = kanap.filter((p) => p != foundProduct);

    console.log(kanap);
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
    total = 0;
    for (j = 0; j < kanap.length; j++) {
        let objectPorductFullForPrice = allProducts.find(
            (p) => p._id == kanap[j].id
        );
        total += kanap[j].quantity * objectPorductFullForPrice.price;

        totalPrice.innerText = total;
    }
}

function loopDisplay(productCart, allProducts) {
    let fragment = document.createDocumentFragment();
    for (i = 0; i < productCart.length; i++) {
        console.log(i);
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

        // let articleByClass = document.querySelectorAll(".cart__item");
        // let articleDatasetId = articleByClass[i].dataset.id;
        // let articleDatasetColor = articleByClass[i].dataset.color;

        inputNumber[i].addEventListener("change", (e) => {
            let article = e.target.closest("article");
            let id = article.dataset.id;
            let color = article.dataset.color;
            let newQte = e.target.value;
            if (e.target.value > 100) {
                window.alert("La quantité maximum est de 100");
                e.target.value = 100;
                newQte = 100;
            } else if (e.target.value < 1) {
                removeKanap(id, color);
                article.remove();
            }
            pQuantityFinal.innerText = `Qté : ${newQte}`;
            // pQuantityFinal.innerText = `Qté : ${newQte}`;
            changeQuantity(id, color, newQte);
            totalQuantityy();
            totalPricee(allProducts);
        });

        let deleteBtn = document.querySelectorAll(".deleteItem");

        // let elementRemove = document.querySelectorAll("article");
        // let deleteKanapDisplay = elementRemove[i];

        deleteBtn[i].addEventListener("click", (e) => {
            let article = e.target.closest("article");
            let id = article.dataset.id;
            let color = article.dataset.color;

            removeKanap(id, color);
            article.remove();

            // removeKanap(articleDatasetId, articleDatasetColor);
            // deleteKanapDisplay.remove();
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
firstName.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[a-zA-Z_'.-]*$/)) {
        firstNameErrorMsg.innerText = "Veuillez déclarer un Prénom correct";
    } else {
        firstNameErrorMsg.innerText = "";
    }
    // !e.target.value.match(/^[a-zA-Z0-9_.-]*$/);
});

let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
// console.log(lastNameErrorMsg);
lastName.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[a-zA-Z_'.-]*$/)) {
        lastNameErrorMsg.innerText = "Veuillez déclarer un Nom correct";
    } else {
        lastNameErrorMsg.innerText = "";
    }
});

let addressErrorMsg = document.getElementById("addressErrorMsg");
// console.log(addressErrorMsg);
address.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[0-9]*[a-zA-Z\s,'.-]*$/)) {
        addressErrorMsg.innerText = "Veuillez déclarer une Adresse correct";
    } else {
        addressErrorMsg.innerText = "";
    }
});

let cityErrorMsg = document.getElementById("cityErrorMsg");
// console.log(cityErrorMsg);
city.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[a-zA-Z\s_'.-]*$/)) {
        cityErrorMsg.innerText = "Veuillez déclarer ue Ville correct";
    } else {
        cityErrorMsg.innerText = "";
    }
});

let emailErrorMsg = document.getElementById("emailErrorMsg");
// console.log(emailErrorMsg);
email.addEventListener("input", (e) => {
    if (!e.target.value.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        emailErrorMsg.innerText = "Veuillez déclarer un Email correct";
    } else {
        emailErrorMsg.innerText = "";
    }
});

displayCart();
