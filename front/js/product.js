console.log("product");
// Get params from url
const searchUrl = window.location.search;
const urlParams = new URLSearchParams(searchUrl);

const id = urlParams.get("id");

// variables
let color = undefined
let quantity = undefined
product = undefined


window.onload = async function exampleFunction() {
  // Function to be executed
  console.log(id);
  const response = await fetch("http://localhost:3000/api/products/" + id);
  const data = await response.json();
  product = data
  // Update page with fetched data
  const img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.altText;
  document.querySelector(".item__img").appendChild(img);

  document.querySelector("#title").innerHTML = data.name;
  document.querySelector("#price").innerHTML = data.price;
  document.querySelector("#description").innerHTML = data.description;

  select = document.querySelector("#colors");
  data.colors.forEach((color) => {
    var opt = document.createElement("option");
    opt.value = color;
    opt.innerHTML = color;
    select.appendChild(opt);
  });
};

// listen color button
const colorSelect = document.querySelector('#colors')
colorSelect.addEventListener('change', (e) => {
    color = e.target.value
    console.log(color, quantity);
})
// listen quantity button
const quantityButton = document.querySelector('#quantity')
quantityButton.addEventListener('change', (e) => {
    quantity = e.target.value
    console.log(color, quantity);
})

function add2Cart() {

}

//listen add to cart button
const cartButton = document.querySelector('#addToCart')
cartButton.addEventListener('click', () => {
    console.log('cliock cart button');
    // check if we have a quantity and a color selected
    if(color && quantity) {
        //add to localstorage
        const cart = [{
            color,
            quantity,
            product
        }]
        console.log(cart, 'CART');
        //localStorage.setItem('cart')
    } else {
        alert('vous devez sélectioner une couleur et une quantité pour pouvoir l\'ajouter au panier')
    }
})