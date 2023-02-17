import { getCart, updateQuantity } from "./utils.js";

console.log("cart js");
const cartItems = document.querySelector("#cart__items");

/* varialbles */
let totalPrice = 0;
let totalQuantity = 0;

const cart = getCart();
const response = await fetch("http://localhost:3000/api/products");
const allProducts = await response.json();

window.onload = async function createCards() {
  // update total quantity and total price
  const numberOfArticles = document.querySelector("#totalQuantity");
  const price = document.querySelector("#totalPrice");

  await Promise.all(
    cart.map(async (item) => {
      console.log(item, "item");
      const response = await fetch(
        "http://localhost:3000/api/products/" + item.id
      );
      const data = await response.json();

      //loop for each product in products
      item.products.forEach((product) => {
        totalPrice = totalPrice + product.quantity * data.price;
        totalQuantity = totalQuantity + product.quantity;
        // Create articles
        const article = document.createElement("article");
        article.className = "cart__item";
        article.dataset.id = data._id;
        article.dataset.color = product.color;

        const topDiv = document.createElement("div");
        topDiv.className = "cart__item__img";

        const img = document.createElement("img");
        img.src = data.imageUrl;
        img.alt = data.altText;

        topDiv.appendChild(img);

        const bottomDiv = document.createElement("div");
        bottomDiv.className = "cart__item__content";

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "cart__item__content__description";

        const descriptionDivH2 = document.createElement("h2");
        descriptionDivH2.innerText = data.name;
        descriptionDiv.appendChild(descriptionDivH2);

        const descriptionDivColor = document.createElement("p");
        descriptionDivColor.innerText = product.color;
        descriptionDiv.appendChild(descriptionDivColor);

        const descriptionDivPrice = document.createElement("p");
        descriptionDivPrice.innerText = data.price;
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
        quantityInput.value = product.quantity;

        quantityInput.addEventListener("change", (e) => {
          console.log("change", e.path);
          console.log("🚀 ~ file: cart.js:86 ~ quantityInput.addEventListener ~ dataset", product)

          updateQuantity(item.id, product.color, e.target.value);
          const { price: prc, quantity } = getTotalPriceAndQuantity(
            getCart(),
            allProducts
          );
          console.log(price, quantity);
          numberOfArticles.innerHTML = quantity
          price.innerHTML = prc
        });

        settingsQuantityDiv.appendChild(quantityP);
        settingsQuantityDiv.appendChild(quantityInput);

        const deleteDiv = document.createElement("div");
        deleteDiv.className = "cart__item__content__settings__delete";

        const deleteP = document.createElement("p");
        deleteP.innerText = "Supprimer";
        deleteP.className = "deleteItem";

        deleteP.addEventListener('click', () => {
          const { price: prc, quantity } = deleteItemFromCart(item.id, product.color, allProducts)
          numberOfArticles.innerHTML = quantity
          price.innerHTML = prc
          article.remove()
        })

        deleteDiv.appendChild(deleteP);

        settingsDiv.appendChild(settingsQuantityDiv);
        settingsDiv.appendChild(deleteDiv);

        bottomDiv.appendChild(settingsDiv);

        article.appendChild(topDiv);
        article.appendChild(bottomDiv);

        cartItems.appendChild(article);
      });
    })
  );
  price.innerHTML = totalPrice;
  numberOfArticles.innerHTML = totalQuantity;
};

function getTotalPriceAndQuantity(cart, data) {
  let price = 0;
  let quantity = 0;
  cart.forEach((item) => {
    const itemPrice = data.find((i) => i._id === item.id).price;
    item.products.forEach((product) => {
      price = price + itemPrice * product.quantity;
      quantity = quantity + product.quantity;
    });
  });
  return { price, quantity };
}

function updatePriceAndQuantity(cart, data) {
  let price = 0;
  let quantity = 0;
  cart.forEach((item) => {
    const itemPrice = data.find((i) => i._id === item.id).price;
    item.products.forEach((product) => {
      price = price + itemPrice * product.quantity;
      quantity = quantity + product.quantity;
    });
  });
  return { price, quantity };
}


function deleteItemFromCart(id, color, data) {
  const cart = getCart()
  let newCart = cart.map(item => {
    if (item.id === id) {
      return { ...item, products: item.products.filter(i => i.color !== color) }
    }
    return item
  })
  newCart = newCart.filter(i => i.products.length !== 0)
  localStorage.setItem('cart', JSON.stringify(newCart))
  const { price, quantity } = updatePriceAndQuantity(cart, data)
  return { price, quantity }
}