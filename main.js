// Selecting elements from index.html
const productName = document.querySelector("#product-name-input");
const productPrice = document.querySelector("#product-price-input");
const productImage = document.querySelector("#product-image-input");
const addProductButton = document.querySelector("#add-product-bnt");
const totalPrice = document.querySelector("#total-price");

const productListDashboard = document.querySelector(
    "#product-list-dashboard"
);
const productList = document.querySelector("#product-list");

const productCartList = document.querySelector("#product-cart");

const cartIcon = "./images/add-50.png";

let productCart = [];

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {
    products = [
        {
            id: 0,
            name: "Product 1",
            price: 500.0,
            img: "https://i.pinimg.com/enabled_hi/564x/fe/a4/bc/fea4bc6cf91b5868621b176e457f51d8.jpg",
        },
        {
            id: 1,
            name: "Product 2",
            price: 750.0,
            img: "https://i.pinimg.com/enabled_hi/564x/4d/99/12/4d991212fe9a212c93e65c304fbdb6c9.jpg",
        },
        {
            id: 2,
            name: "Product 3",
            price: 1000.0,
            img: "https://i.pinimg.com/enabled_hi/564x/0e/e7/19/0ee719eb218bfac174b0c7b27b6716e0.jpg",
        },
        {
            id: 3,
            name: "Product 4",
            price: 1200.0,
            img: "https://i.pinimg.com/enabled_hi/564x/1d/d1/33/1dd13347367952e60b9ac0ec8895c4de.jpg",
        },
    ];
    // Save the default products to localStorage
    localStorage.setItem("products", JSON.stringify(products));
}

// Function to save products to localStorage
const saveProductsToLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(products));
};

// Add product button functionality
if (addProductButton) {
    addProductButton.addEventListener("click", () => {
        const productNameText = productName.value;
        const productPriceValue = productPrice.value;
        const productImageValue = productImage.value;

        if (productNameText && productPriceValue && productImageValue) {
            const product = {
                id: Date.now(), // Ensure unique ID
                name: productNameText,
                price: productPriceValue,
                img: productImageValue,
            };
            products.push(product);
            saveProductsToLocalStorage();
            renderDashboard(products);

            productName.value = "";
            productPrice.value = 0;
            productImage.value = "";
        }
    });
}

// Edit product functionality
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
        saveProductsToLocalStorage(); // Save changes to localStorage
        renderDashboard(products);
    }
};

// Delete product functionality
const deleteProduct = (id) => {
    const product = products.find((e) => e.id === id);

    const confirmation = confirm(
        `Are you sure you want to delete ${product.name}?`
    );

    if (confirmation) {
        products = products.filter((e) => e.id !== id);
        saveProductsToLocalStorage();
        renderDashboard(products);
    }
};

const addProduct = (id) => {
    const product = products.find((e) => e.id === id);

    if (product) {
        const cartItem = productCart.find((item) => item.id === id);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            productCart.push({ ...product, quantity: 1 });
        }

        saveCartToLocalStorage(); // Save updated cart to localStorage
        renderCart(productCart); // Re-render cart with updated products
    }
};

const saveCartToLocalStorage = () => {
    localStorage.setItem("productCart", JSON.stringify(productCart));
};

const loadCartFromLocalStorage = () => {
    const storedCart = JSON.parse(localStorage.getItem("productCart"));
    if (storedCart) {
        productCart = storedCart;
    }
};

// Render the product list in the admin dashboard
const renderDashboard = (products) => {
    if (productListDashboard) {
        productListDashboard.innerHTML = "";
        products.forEach((element) => {
            const cardContainer = document.createElement("div");
            cardContainer.className = "border rounded-lg p-2 z-0";

            const cardImageCrop = document.createElement("div");
            cardImageCrop.className = "w-full h-48 overflow-hidden";

            const cardImage = document.createElement("img");
            cardImage.className = "w-full rounded-[3px] pb-3";
            cardImage.src = element.img;
            cardImageCrop.appendChild(cardImage);

            const cardProductName = document.createElement("h3");
            cardProductName.textContent = element.name;
            cardProductName.className = "line-clamp-2 font-bold text-lg";

            const cardPrice = document.createElement("p");
            cardPrice.textContent = `Price: ${element.price.toFixed(
                2
            )} THB`;

            const cardButtonDiv = document.createElement("div");
            cardButtonDiv.className = "flex justify-between";

            const cardEdit = document.createElement("button");
            cardEdit.textContent = "Edit";
            cardEdit.className =
                "py-2 px-4 border bg-blue-800 rounded-lg text-white";
            cardEdit.addEventListener("click", () =>
                editProduct(element.id)
            );
            cardButtonDiv.appendChild(cardEdit);

            const cardDelete = document.createElement("button");
            cardDelete.textContent = "Delete";
            cardDelete.className =
                "py-2 px-4 border bg-red-600 rounded-lg text-white";
            cardDelete.addEventListener("click", () =>
                deleteProduct(element.id)
            );
            cardButtonDiv.appendChild(cardDelete);

            cardContainer.appendChild(cardImageCrop);
            cardContainer.appendChild(cardProductName);
            cardContainer.appendChild(cardPrice);
            cardContainer.appendChild(cardButtonDiv);

            productListDashboard.appendChild(cardContainer);
        });
    }
};

// Render the product list for the shopping page
const renderProduct = (products) => {
    if (productList) {
        productList.innerHTML = "";
        products.forEach((element) => {
            const cardContainer = document.createElement("div");
            cardContainer.className = "border rounded-lg p-2 relative z-0";

            const cardImageCrop = document.createElement("div");
            cardImageCrop.className = "w-full h-48 overflow-hidden z-0";

            const cardImage = document.createElement("img");
            cardImage.className = "w-full rounded-[3px]";
            cardImage.src = element.img;
            cardImageCrop.appendChild(cardImage);

            const cardItemInfo = document.createElement("div");
            cardItemInfo.className = "w-4/6 pt-4";

            const cardProductName = document.createElement("h3");
            cardProductName.textContent = element.name;
            cardProductName.className = "line-clamp-2 font-bold text-lg";
            cardItemInfo.appendChild(cardProductName);

            const cardPrice = document.createElement("p");
            cardPrice.textContent = `Price: ${element.price.toFixed(
                2
            )} THB`;
            cardItemInfo.appendChild(cardPrice);

            const cardIconLink = document.createElement("a");
            cardIconLink.className = "cursor-pointer";
            cardIconLink.addEventListener("click", () =>
                addProduct(element.id)
            );

            const addToCart = document.createElement("img");
            addToCart.src = cartIcon;
            addToCart.className =
                "absolute w-12 bottom-3 right-3 border p-1 bg-white rounded-lg bg-blue-500";

            cardIconLink.appendChild(addToCart);

            cardContainer.appendChild(cardImageCrop);
            cardContainer.appendChild(cardItemInfo);
            // cardContainer.appendChild(cardProductName);
            cardContainer.appendChild(cardIconLink);

            productList.appendChild(cardContainer);
        });
    }
};

const renderCart = (cartItems) => {
    if (productCartList) {
        productCartList.innerHTML = ""; // Clear the cart before rendering

        let total = 0;

        cartItems.forEach((element) => {
            const cardContainer = document.createElement("div");
            cardContainer.className =
                "flex justify-between items-center rounded-lg relative z-0";

            const cardImageCrop = document.createElement("div");
            cardImageCrop.className = "h-20 overflow-hidden z-0";

            const cardImage = document.createElement("img");
            cardImage.className = "w-20 rounded-[3px]";
            cardImage.src = element.img;
            cardImageCrop.appendChild(cardImage);

            const cardProductName = document.createElement("h3");
            cardProductName.textContent = element.name;
            cardProductName.className = "font-bold text-lg";

            const cardPrice = document.createElement("p");
            cardPrice.textContent = `Price: ${(
                element.price * element.quantity
            ).toFixed(2)} THB`;

            const cardQuantity = document.createElement("p");
            cardQuantity.textContent = `Quantity: ${element.quantity}`; // Display quantity

            cardContainer.appendChild(cardImageCrop);
            cardContainer.appendChild(cardProductName);
            cardContainer.appendChild(cardQuantity);
            cardContainer.appendChild(cardPrice);

            productCartList.appendChild(cardContainer);

            
            total += element.price * element.quantity;
            totalPrice.innerHTML = `Total Price: ${total.toFixed(2)}`;
            totalPrice.className = 'mt-8 text-right text-3xl font-bold'
        });
    }
};

window.addEventListener("DOMContentLoaded", () => {
    renderDashboard(products); //Admin
    renderProduct(products); //Shopping
    loadCartFromLocalStorage(); // Load cart from localStorage
    renderCart(productCart);
});
