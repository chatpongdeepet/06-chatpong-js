const productName = document.querySelector("#product-name-input");
const productPrice = document.querySelector("#product-price-input");
const productImage = document.querySelector("#product-image-input");
const addProductButton = document.querySelector("#add-product-bnt");

const productListDashboard = document.querySelector("#product-list");

let products = [
    {
        id: 0,
        name: "Default Product",
        price: 50,
        img: "https://i.pinimg.com/enabled_hi/564x/fe/a4/bc/fea4bc6cf91b5868621b176e457f51d8.jpg",
    },
];

addProductButton.addEventListener("click", () => {
    const productNameText = productName.value;
    const productPriceValue = productPrice.value;
    const productImageValue = productImage.value;

    if (productNameText && productPriceValue && productImageValue) {
        const product = {
            name: productNameText,
            price: productPriceValue,
            img: productImageValue,
        };
        products.push(product);
        renderDashboard(products);

        productName.value = "";
        productPrice.value = 0;
        productImage.value = "";
    }
    console.log(products);
});

const editProduct = (id) => {
    const product = products.find((e) => e.id === id);
    if (product) {
        const newProductName = prompt("New Product Name", product.name);
        const newProductPrice = prompt("New Product Price", product.price);

        if (newProductName !== null) {
            product.name = newProductName.trim();
        }

        if (newProductPrice !== null) {
            product.price = parseFloat(newProductPrice);
        }
        renderDashboard(products);
    }
};

const deleteProduct = (id) => {
    const product = products.find((e) => e.id === id);

    const confirmation = confirm(
        `Are you sure you want to delete ${product.name}?`
    );

    if (confirmation) {
        products = products.filter((e) => e.id !== id);

        renderDashboard(products);
    }
};

const renderDashboard = (products) => {
    productListDashboard.innerHTML = "";
    products.forEach((element) => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "border rounded-lg p-2";

        //Card Image setting
        const cardImage = document.createElement("img");
        cardImage.className = "w-full rounded-[3px] pb-3";
        cardImage.src = element.img;

        //Card Name Setting
        const cardProductName = document.createElement("h3");
        cardProductName.textContent = element.name;
        cardProductName.className = "line-clamp-2 font-bold text-lg";

        const cardPrice = document.createElement("p");
        cardPrice.textContent = `Price: ${element.price} THB`;

        const cardButtonDiv = document.createElement("div");
        cardButtonDiv.className = "flex border justify-between";

        //Card Button
        const cardEdit = document.createElement("button");
        cardEdit.textContent = "Edit";
        cardEdit.addEventListener("click", () => editProduct(element.id));
        cardButtonDiv.appendChild(cardEdit);

        const cardDelete = document.createElement("button");
        cardDelete.textContent = "Delete";
        cardDelete.addEventListener("click", () =>
            deleteProduct(element.id)
        );
        cardButtonDiv.appendChild(cardDelete);

        cardContainer.appendChild(cardImage);
        cardContainer.appendChild(cardProductName);
        cardContainer.appendChild(cardPrice);
        cardContainer.appendChild(cardButtonDiv);

        productListDashboard.appendChild(cardContainer);
    });
};

renderDashboard(products);
