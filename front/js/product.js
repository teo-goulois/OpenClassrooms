import { getCart } from "./utils.js";

/**
 * @typedef {Object} Product
 * @property {string[]} colors
 * @property {string} _id
 * @property {string} name
 * @property {number} price
 * @property {string} imageUrl
 * @property {string} description
 * @property {string} altTxt
 */

/**
 * @typedef {Object} CartProduct
 * @property {string} id
 * @property {CartProductDetails[]} products
 */


// Get params from url
const searchUrl = window.location.search;
const urlParams = new URLSearchParams(searchUrl);
const cartButton = document.querySelector('#addToCart')

const id = urlParams.get("id");

// variables
let color = undefined
let quantity = 1

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
    if (quantity < 1 || quantity > 100) return alert('vous devez séléctionez une quantité entre 0 et 100')
    if (color && quantity) {
        const cart = getCart()
        const productIsFound = cart.find((el) => el.id === product._id)
        if (productIsFound) {
            const foundColor = productIsFound.products.find(el => el.color === color)
            if (foundColor) {
                if(foundColor.quantity + quantity > 100) return alert('vous ne pouvez pas ajouter plus de 100 produits au panier')
                foundColor.quantity = parseInt(foundColor.quantity + quantity)
            } else {
                productIsFound.products.push({ color, quantity })
            }
        } else {
            cart.push({ id: product._id, products: [{ color, quantity }] })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        if (confirm('voulez vous aller au panié ?')) {
            window.location.replace('/front/html/cart.html')
        }
    } else {
        alert('vous devez sélectioner une couleur et une quantité pour pouvoir l\'ajouter au panier')
    }
}

