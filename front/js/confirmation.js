console.log('confirmation');

const orderEl = document.querySelector('#orderId')

const searchUrl = window.location.search;
const urlParams = new URLSearchParams(searchUrl);
const orderId =  urlParams.get('order_id')

orderEl.innerHTML = orderId

localStorage.clear()