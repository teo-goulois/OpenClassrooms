
// fetch data then return it
async function fetchData() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

const items = document.querySelector(".items");

const data = await fetchData();

// for each item create a card
data.forEach((element) => {
  const a = document.createElement("a");
  a.href = `./product.html?id=${element._id}`;

  const article = document.createElement("article");
  a.appendChild(article);

  const img = document.createElement("img");
  img.src = element.imageUrl;
  img.alt = element.altText;

  const h3 = document.createElement("h3");
  h3.innerHTML = element.name;
  h3.className = "productName";

  const p = document.createElement("p");
  p.innerText = element.description;
  p.className = "productDescription";

  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(p)

  items.appendChild(a);
});
