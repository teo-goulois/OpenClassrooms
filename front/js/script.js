import { fetchProducts } from "./utils.js";

/**
 * @typedef {import { Product } from "./types.js";} Product
 */


const items = document.querySelector(".items");

const products = await fetchProducts();

// for each item create a card
products.forEach((product) => {
  createItem(product)
});

/**
 * create a card of a product
 * @param { Product } product
 */
function createItem(product) {
  const a = document.createElement("a");
  a.href = `./product.html?id=${product._id}`;

  const article = document.createElement("article");
  a.appendChild(article);

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.altText;

  const h3 = document.createElement("h3");
  h3.innerHTML = product.name;
  h3.className = "productName";

  const p = document.createElement("p");
  p.innerText = product.description;
  p.className = "productDescription";

  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(p)

  items.appendChild(a);
}
