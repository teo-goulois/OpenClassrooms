// Get params from url
const searchUrl = window.location.search;
const urlParams = new URLSearchParams(searchUrl);

const id = urlParams.get("id");

// variables
let color = undefined
let quantity = undefined
let product = undefined


window.onload = async function exampleFunction() {
  // Function to be executed
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
})
// listen quantity button
const quantityButton = document.querySelector('#quantity')
quantityButton.addEventListener('change', (e) => {
    quantity = parseInt(e.target.value) 
})

function add2Cart() {
     // check if we have a quantity and a color selected
     if(color && quantity) {
        //add to localstorage
        const cart = getCart()
        // check if product already in cart
        const productIsFound = cart.find((el) => el.id === product._id)
        if(productIsFound) {
            const foundColor = productIsFound.products.find(el => el.color === color)
            if(foundColor) {
                foundColor.quantity = parseInt(foundColor.quantity + quantity) 
            } else {
                productIsFound.products.push({color, quantity})
            }

        } else {
            // add product to cart
            cart.push({id: product._id, products: [{color, quantity}]})
        }        
        localStorage.setItem('cart', JSON.stringify(cart))
    } else {
        alert('vous devez sélectioner une couleur et une quantité pour pouvoir l\'ajouter au panier')
    }
}

//listen add to cart button
const cartButton = document.querySelector('#addToCart')
cartButton.addEventListener('click', () => {
    add2Cart()
})

function getCart() {
    let rawCart = localStorage.getItem('cart')
    if(!rawCart) {
        // Create a cart
        localStorage.setItem('cart', JSON.stringify([]))
        rawCart = localStorage.getItem('cart')
    }
    const cart = JSON.parse(rawCart)
    return cart
}