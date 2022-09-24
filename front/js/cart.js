const sectionCartItems = document.getElementById("cart__items");
// console.log(sectionCartItems);

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

function saveKanapCartInLocalStorage(kanap) {
    localStorage.setItem("kanapCart", JSON.stringify(kanap));
}

function changeQuantity(id, color, value) {
    let kanap = getKanapCartInLocalStorage();
    let foundProduct = kanap.find((p) => p.id == id && p.color == color);
    if (foundProduct != undefined) {
        foundProduct.quantity = value;
        console.log("je marche");
        saveKanapCartInLocalStorage(kanap);
        if (foundProduct.quantity <= 0) {
            removeKanap(foundProduct);
        } else {
            saveKanapCartInLocalStorage(kanap);
        }
    }
}

async function displayCart() {
    let productCart = await getKanapCartInLocalStorage();
    let allProducts = await getKanap();
    console.log(allProducts);
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
        console.log(pQuantity[i]);
        let articleByClass = document.querySelectorAll(".cart__item");
        console.log(articleByClass[i].dataset.id);
        let articleDatasetId = articleByClass[i].dataset.id;
        let articleDatasetColor = articleByClass[i].dataset.color;

        // article.dataset.id = productCart[i].id;
        // article.dataset.color = productCart[i].color;

        // console.log(inputNumber[i]);
        // console.log(productCart[i]);

        inputNumber[i].addEventListener("change", (e) => {
            pQuantityFinal.innerHTML = `<p>Qté : ${e.target.value}</p>`;
            changeQuantity(
                articleDatasetId,
                articleDatasetColor,
                e.target.value
            );
            console.log(e.target.value);
            console.log(e);
            // displayCart();
        });
    }
}

displayCart();
