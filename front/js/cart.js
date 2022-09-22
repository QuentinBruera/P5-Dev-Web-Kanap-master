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

async function displayCart() {
    let productCart = await getKanapCartInLocalStorage();
    let allProducts = await getKanap();
    console.log(allProducts);
    let fragment = document.createDocumentFragment();
    productCart.forEach(async (product) => {
        // console.log(product.id);
        let objectPorductFull = allProducts.find((p) => p._id == product.id);
        console.log(objectPorductFull);
        let article = document.createElement("article");
        article.className = "cart__item";
        article.dataset.id = product.id;
        article.dataset.color = product.color;
        article.innerHTML = `
        <div class="cart__item__img">
        <img src=${objectPorductFull.imageUrl} alt="${
            objectPorductFull.altTxt
        }">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${objectPorductFull.name}</h2>
        <p>${product.color}</p>
        <p>${numberWithSpace(objectPorductFull.price)} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : ${product.quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            product.quantity
        }">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        `;
        fragment.appendChild(article);
    });
    sectionCartItems.appendChild(fragment);
}
displayCart();
