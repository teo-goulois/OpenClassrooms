/**
 * @typedef {import { Product } from "./types.js";} Product
 * @typedef {import { CartProducts } from "./types.js";} CartProducts
 */

/**
 * return the current cart
 * @returns {CartProducts[]}
 */
export function getCart() {
  let rawCart = localStorage.getItem("cart");
  if (!rawCart) {
    // Create a cart
    localStorage.setItem("cart", JSON.stringify([]));
    rawCart = localStorage.getItem("cart");
  }
  const cart = JSON.parse(rawCart);
  console.log("🚀 ~ file: utils.js:9 ~ getCart ~ cart", cart)
  return cart;
}

export function updateQuantity(id, color, quantity) {
  //add to localstorage
  const cart = getCart();

  // check if product already in cart
  const productIsFound = cart.find((el) => el.id === id);
  if (productIsFound) {
    const foundColor = productIsFound.products.find((el) => el.color === color);
    if (foundColor) {
      foundColor.quantity = parseInt(quantity);
    } else {
      return alert("vous ne pouvez ajouter ou retirer ce produit");
      productIsFound.products.push({ color, quantity });
    }
  } else {
    return alert("vous ne pouvez ajouter ou retirer ce produit");
    // add product to cart
    cart.push({ id: product._id, products: [{ color, quantity }] });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
