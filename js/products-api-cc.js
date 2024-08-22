const cardsContainer = document.querySelector('#home-main-content')
const allProductsUrl = 'https://dummyjson.com/products?limit=0'


const fetchAllProducts = async () => {
  const response = await fetch(allProductsUrl)
  const data = await response.json()
  return data.products
}

const calcPrice = (product) => {
  return price = product.price * product.discountPercentage
}

const showResult = (arr) => {
  arr.forEach((product) => {
    cardsContainer.innerHTML += `
      <div class="product-card">
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
  })
}

const getAllProducts = async () => {
  const products = await fetchAllProducts()
  showResult(products)
}


getAllProducts()

