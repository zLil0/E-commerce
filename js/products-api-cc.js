const cardsContainer = document.querySelector('#home-main-content')
const allProductsUrl = 'https://dummyjson.com/products?limit=33'


const fetchAllProducts = async () => {
  const response = await fetch(allProductsUrl)
  const data = await response.json()
  return data.products
}

const calcPrice = (product) => {
  return price = product.price * 1 - (product.discountPercentage/100)
}

const showAllCards = (arr) => {
  arr.forEach((product) => {
    if(product.discountPercentage <= "0.5"){
      cardsContainer.innerHTML += `
      <div class="product-card" onclick="goToProductPage(${product.id})">
        <img src="${product.thumbnail}" alt="${product.title}" class="card-thumbnail">
        <div class="card-text">
          <header class="card-header"><h3 class="product-name">${product.title}</h1></header>
            <p class="card-body">
              <span class="price">$ ${calcPrice(product).toFixed(2)}</span>
            </p>
            <div class="rating-container">
              <img src="assets/star-rating.svg" alt="star">
              <span class="rating">${product.rating}</span>
            </div>
          </div>
      </div>
    `
    }
    else {
      cardsContainer.innerHTML += `
      <div class="product-card" onclick="goToProductPage(${product.id})">
        <img src="${product.thumbnail}" alt="${product.title}" class="card-thumbnail">
        <div class="card-text">
          <header class="card-header"><h3 class="product-name">${product.title}</h1></header>
            <p class="card-body">
              <span class="price">$ ${calcPrice(product).toFixed(2)}</span>
              was <span class="old-price">$${product.price}</span>
            </p>
            <div class="rating-container">
              <img src="assets/star-rating.svg" alt="star">
              <span class="rating">${product.rating}</span>
            </div>
          </div>
      </div>
    `
    }
  })
}

const getAllProducts = async () => {
  const products = await fetchAllProducts()
  showAllCards(products)
}

getAllProducts()

const goToProductPage = (i) =>{
  window.location.href ='product.html'
}

