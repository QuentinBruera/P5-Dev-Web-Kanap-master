const itemsSection = document.getElementById("items");

async function getKanap() {
    const response = await fetch("http://localhost:3000/api/products");
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.error);
    }
}

async function displayKanap() {
    let products = await getKanap();
    // console.log(products);
    let fragment = document.createDocumentFragment();
    products.forEach((product) => {
        let link = document.createElement("a");
        link.href = `./product.html?id=${product._id}`;
        link.innerHTML = `
            <article>
                <img src=${product.imageUrl} alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>`;
        fragment.appendChild(link);
    });
    itemsSection.appendChild(fragment);
}

displayKanap();
