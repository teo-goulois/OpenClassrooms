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


/**
 * fetch all products then return it
 * @param {string} [id]
 * @returns {Promise<Product[]>}
 */
export async function fetchProducts(id) {
  let products = undefined
  if (id) {
    const response = await fetch("http://localhost:3000/api/products/" + id);
    products = await response.json();
  } else {
    const response = await fetch("http://localhost:3000/api/products");
    products = await response.json();

  }
  return products;
}

/**
 * return the current cart
 * @returns {CartProduct[]}
 */
export function getCart() {
  let rawCart = localStorage.getItem("cart");
  if (!rawCart) {
    localStorage.setItem("cart", JSON.stringify([]));
    rawCart = localStorage.getItem("cart");
  }
  const cart = JSON.parse(rawCart);
  return cart;
}





/**
 * 
 * @param {string} id 
 * @param {string} color 
 * @param {number} quantity 
 * @param {CartProduct[]} cart 
 * @returns {CartProduct[]}
 */
export function updateQuantity(id, color, quantity, cart) {
  console.log(id,"🚀 ~ file: utils.js:70 ~ updateQuantity ~ cart", cart)
  // check if product already in cart
  const productIsFound = cart.find((el) => el.id === id);
  console.log("🚀 ~ file: utils.js:72 ~ updateQuantity ~ productIsFound", productIsFound)
  if (productIsFound) {
    const foundColor = productIsFound.products.find((el) => el.color === color);
    if (foundColor) {
      foundColor.quantity = parseInt(quantity);
    } else {
      return alert("vous ne pouvez ajouter ou retirer ce produit");
    }
  } else {
    return alert("vous ne pouvez ajouter ou retirer ce produit");
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart
}
