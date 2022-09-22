const itemsSection = document.getElementById("items");

/*async function fetchKanap() {
    await fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((data) => (kanapData = data));
    console.log(kanapData[0]);
    itemsSectionDisplay();
}*/
async function getKanap() {
    const response = await fetch("http://localhost:3000/api/products");
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.error);
    }
}

/*
function itemsSectionDisplay() {
    itemsSection.innerHTML = kanapData
        .map(
            (kanap) =>
                `
        <a href="./product.html?id=${kanap._id}">
            <article>
                <img src=${kanap.imageUrl} alt="${kanap.altTxt}">
                <h3 class="productName">${kanap.name}</h3>
                <p class="productDescription">${kanap.description}</p>
            </article>
        </a>
        `
        )
        .join("");
}*/
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
