const socket = io();

// DOM element
let productsList = document.getElementById("products");

socket.on("product_added", (product) => {
  let item = document.createElement("li");
  item.classList.add("gallery");
  item.innerHTML = `<h3>${product.title}</h3> <p>$${product.price}</p> <p>${product.description}</p>`;
  item.setAttribute("data-id", product.id)
  productsList.appendChild(item);
});

socket.on("product_deleted", (productId) => {
  const productItem = productsList.querySelector(`li.gallery[data-id="${productId}"]`);
  if (productItem) {
    productsList.removeChild(productItem);
  }
});

document.getElementById('create_product').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const newProduct = {};
  formData.forEach((value, key) => {
    newProduct[key] = value;
  });
  socket.emit('create_product', newProduct);
  form.reset();
});

document.getElementById('delete_product').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const productId = formData.get('id');
  socket.emit('delete_product', productId); 
  form.reset();
});