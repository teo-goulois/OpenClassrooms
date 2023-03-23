import { getCart, updateQuantity, fetchProducts } from "./utils.js";

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

/**
 * @typedef {Object} CartProductDetails
 * @property {string} color
 * @property {number} quantity 
 */

// Elements
const cartItems = document.querySelector("#cart__items");
const numberOfArticlesEl = document.querySelector("#totalQuantity");
const priceEl = document.querySelector("#totalPrice");

/* varialbles */
let totalPrice = 0;
let totalQuantity = 0;

/**
 * @type {CartProduct[]}
 */
let currentCart = []
/**
 * @type {CartProduct[]}
 */
const allProducts = await fetchProducts()

window.onload = async () => {
  const cart = getCart()
  currentCart = cart

  await Promise.all(
    cart.map(async (cartProduct) => {
      const product = await fetchProducts(cartProduct.id)

      //loop for each product in products
      cartProduct.products.forEach((cartDetails) => {
        createCard(product, cartDetails, currentCart)
        totalPrice = totalPrice + cartDetails.quantity * product.price;
        totalQuantity = totalQuantity + cartDetails.quantity;
      })
    })
  )

  priceEl.innerHTML = totalPrice;
  numberOfArticlesEl.innerHTML = totalQuantity;
};


/**
 * @param {Product} product
 * @param {CartProductDetails} cartDetails
 * @param {CartProduct[]} cart
 */
const createCard = async (product, cartDetails, cart) => {
  // Create articles
  const article = document.createElement("article");
  article.className = "cart__item";
  article.dataset.id = product._id;
  article.dataset.color = cartDetails.color;

  const topDiv = document.createElement("div");
  topDiv.className = "cart__item__img";

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.altTxt;

  topDiv.appendChild(img);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "cart__item__content";

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "cart__item__content__description";

  const descriptionDivH2 = document.createElement("h2");
  descriptionDivH2.innerText = product.name;
  descriptionDiv.appendChild(descriptionDivH2);

  const descriptionDivColor = document.createElement("p");
  descriptionDivColor.innerText = cartDetails.color;
  descriptionDiv.appendChild(descriptionDivColor);

  const descriptionDivPrice = document.createElement("p");
  descriptionDivPrice.innerText = product.price;
  descriptionDiv.appendChild(descriptionDivPrice);

  bottomDiv.appendChild(descriptionDiv);

  const settingsDiv = document.createElement("div");
  settingsDiv.className = "cart__item__content__settings";

  const settingsQuantityDiv = document.createElement("div");
  settingsQuantityDiv.className =
    "cart__item__content__settings__quantity";

  const quantityP = document.createElement("p");
  quantityP.innerText = "Qté : ";

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.className = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.max = "100";
  quantityInput.value = cartDetails.quantity;

  quantityInput.addEventListener("change", (e) => {
    if (e.target.value < 1 || e.target.value > 100 ) return alert('vous devez séléctionez une quantité supérieur à 0')
    const updatedCart = updateQuantity(product._id, cartDetails.color, e.target.value, currentCart);
    currentCart = updatedCart
    updatePriceAndQuantity(currentCart)
  });

  settingsQuantityDiv.appendChild(quantityP);
  settingsQuantityDiv.appendChild(quantityInput);

  const deleteDiv = document.createElement("div");
  deleteDiv.className = "cart__item__content__settings__delete";

  const deleteP = document.createElement("p");
  deleteP.innerText = "Supprimer";
  deleteP.className = "deleteItem";

  deleteP.addEventListener('click', () => {
    deleteItemFromCart(product._id, cartDetails.color, cart)
    article.remove()
  })

  deleteDiv.appendChild(deleteP);

  settingsDiv.appendChild(settingsQuantityDiv);
  settingsDiv.appendChild(deleteDiv);

  bottomDiv.appendChild(settingsDiv);

  article.appendChild(topDiv);
  article.appendChild(bottomDiv);

  cartItems.appendChild(article);

}


/**
 * update the price and quantity from the currentCart 
 * @param {CartProduct[]} cart the current cart
 */
function updatePriceAndQuantity(cart) {
  let totalPrice = 0;
  let quantity = 0;
  cart.forEach((item) => {
    const itemPrice = allProducts.find((i) => i._id === item.id).price;
    item.products.forEach((product) => {
      totalPrice = totalPrice + itemPrice * product.quantity;
      quantity = quantity + product.quantity;
    });
  });
  priceEl.innerHTML = totalPrice;
  numberOfArticlesEl.innerHTML = quantity;
}

/**
 * deletefrom the currentCart in function of the color
 * @param {string} id 
 * @param {string} color 
 * @param {CartProduct[]} cart the current cart
 * @returns 
 */
function deleteItemFromCart(id, color, cart) {
  let newCart = cart.map(item => {
    if (item.id === id) {
      return { ...item, products: item.products.filter(i => i.color !== color) }
    }
    return item
  })
  currentCart = newCart.filter(i => i.products.length !== 0)
  localStorage.setItem('cart', JSON.stringify(currentCart))
  updatePriceAndQuantity(currentCart)
}
