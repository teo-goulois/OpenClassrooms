import { getCart } from "./utils.js";

/**
 * @typedef {import { Product } from "./types.js";} Product
 * @typedef {import { CartProducts } from "./types.js";} CartProducts
 */


// Get params from url
const searchUrl = window.location.search;
const urlParams = new URLSearchParams(searchUrl);
const cartButton = document.querySelector('#addToCart')

const id = urlParams.get("id");

// variables
let color = undefined
let quantity = 0
let product = undefined

// Elements
const colorSelect = document.querySelector("#colors");
const quantityButton = document.querySelector('#quantity')

/**
 * @param {string} id id of current product
 * @returns {Promise<Product>}
 */
const getProductInfos = async () => {
    const response = await fetch("http://localhost:3000/api/products/" + id);
    const product = await response.json();
    return product
}

/**
 * add dynamism to the page
 * @param {Product} product
 */
const createProduct = (product) => {
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altText;
    document.querySelector(".item__img").appendChild(img);

    document.querySelector("#title").innerHTML = product.name;
    document.querySelector("#price").innerHTML = product.price;
    document.querySelector("#description").innerHTML = product.description;

    product.colors.forEach((color) => {
        var opt = document.createElement("option");
        opt.value = color;
        opt.innerHTML = color;
        colorSelect.appendChild(opt);
    });
}

window.onload = async () => {
    const product = await getProductInfos()
    createProduct(product)
    cartButton.addEventListener('click', () => {
        add2Cart(product)
        if(confirm('voulez vous aller au panié ?')) {
            window.location.replace('/front/html/cart.html')
        }
    })

}


colorSelect.addEventListener('change', (e) => {
    color = e.target.value
})

quantityButton.addEventListener('change', (e) => {
    quantity = parseInt(e.target.value)
})

/**
 * @param {Product} product
 */
function add2Cart(product) {
    // check if we have a quantity and a color selected
    if (color && quantity) {
        const cart = getCart()

        const productIsFound = cart.find((el) => el.id === product._id)
        if (productIsFound) {
            const foundColor = productIsFound.products.find(el => el.color === color)
            if (foundColor) {
                foundColor.quantity = parseInt(foundColor.quantity + quantity)
            } else {
                productIsFound.products.push({ color, quantity })
            }

        } else {
            cart.push({ id: product._id, products: [{ color, quantity }] })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    } else {
        alert('vous devez sélectioner une couleur et une quantité pour pouvoir l\'ajouter au panier')
    }
}

