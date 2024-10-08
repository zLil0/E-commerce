const cardsContainer = document.querySelector('#cards-container')
let page = 0
const sortBySelect = document.querySelector('#sort-by')

const sortBy = (p) =>{
  const op = sortBySelect.value
  let url
  switch(op){
    case 'lower-price': url = `https://dummyjson.com/products?limit=24&skip=${24 * p}&sortBy=price&order=asc`
    break
    case 'higher-price': url = `https://dummyjson.com/products?limit=24&skip=${24 * p}&sortBy=price&order=desc`
    break
    case 'rating': url = `https://dummyjson.com/products?limit=24&skip=${24 * p}&sortBy=rating&order=desc`
    break
    default: url = `https://dummyjson.com/products?limit=24&skip=${24 * p}`
    break
  }
  return url
}

const fetchProducts = async (p) => {
  const url = sortBy(p)
  const response = await fetch(url)
  const data = await response.json()
  return data.products
}

const calcPrice = (product) => {
  return price = product.price / (1 - (product.discountPercentage / 100))
}

const showProducts = (arr) => {
  console.log(arr)
  cardsContainer.innerHTML = ''
  if(arr.length == 0){
    console.log('oi')
    cardsContainer.innerHTML = '<p>No items found.</p>'
  }
  arr.forEach((product) => {
    cardsContainer.innerHTML += `
      <div class="product-card" onclick="goToProductPage(${product.id})">
        <img src="${product.thumbnail}" alt="${product.title}" class="card-thumbnail">
        <div class="card-text">
          <header class="card-header"><h3 class="product-name">${product.title}</h1></header>
            <p class="card-body">
              <span class="price">$ ${product.price}</span>
              was <span class="old-price">$${calcPrice(product).toFixed(2)}</span>
            </p>
            <div class="rating-container">
              <img src="assets/star-rating0.svg" alt="star">
              <span class="rating">${product.rating}</span>
            </div>
          </div>
      </div>
    `
  })
  document.querySelector('#page-number').innerHTML = page + 1
}

const resetResults = async() => {
  page = 0
  const products = await fetchProducts(page)
  showProducts(products)
}

const productsPagination = async (move) => {
  if (move === 'next') {
    if(page<8) page++
    else page = 0
  }
  else if (move === 'prev') {
    if(page>0) page--
    else page = 8
  }

  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
  const products = await fetchProducts(page)
  showProducts(products)
}

const goToProductPage = async (i) => {
  const response = await fetch(`https://dummyjson.com/products/${i}`)
  const product = await response.json()
  document.querySelector('#home-main-content').innerHTML = `
  <div id="product-page">
  <img src="${product.thumbnail}"
        alt="${product.title}" class="card-thumbnail">
      <div class="card-text">
        <header class="card-header">
          <h2 id="product-name">${product.title}</h1>
            <h3 id="product-brand">${product.brand}</h3>
        </header>
        <p id="product-description">${product.description}</p>
        <div id="price-rating-container">
          <div id="price-info">
            <p><span id="discount">-%${product.discountPercentage} </span><span id="price">$${product.price}</span></p>
            <p id="old-price">was <span>${calcPrice(product).toFixed(2)}</span></p>
          </div>
          <div class="rating-container">
            <img src="assets/star-rating0.svg" alt="star">
            <span class="rating">${product.rating}</span>
          </div>
        </div>
        <div id="button-container">
          <button id="add-to-cart">Add-to-Cart</button>
          <p>Stock: <span id="stock-count">${product.stock}</span></p>
        </div>
      </div>
  `
  showReviews(product)
}

const searchProduct = async() =>{
  const name = document.querySelector('#main-search-bar').value
  if(name !== ""){
    const response = await fetch('https://dummyjson.com/products?limit=0')
    const data = await response.json()
    const products = data.products
    let searchResult = []
    products.forEach((product) => {
      if(product.title.toLowerCase().includes(name.toLowerCase())){
        searchResult.push(product)
      }
    })
    page = 0;
    showProducts(searchResult)
  }
}


const reviewStars = (rating) =>{
  let stars = [0,0,0,0,0]
  for(let i = 0; i<rating; i++){
    stars[i] = 1
  }
  return stars
}

const showReviews = (product) => {
  const main = document.querySelector('#home-main')
  main.innerHTML += `
  <div id="comment-section">
      <h2>Comments</h2>
  </div>
  `
  const commentSection = document.querySelector('#comment-section')
  product.reviews.forEach((review)=>{
    const stars = reviewStars(review.rating)
    commentSection.innerHTML += `
    <div class="comment-card">
        <header class="comment-header">
          <h3 class="comment-name">${review.reviewerName}</h3>
          <div class="stars-container">
            <img src="assets/star-rating${stars[0]}.svg" alt="star">
            <img src="assets/star-rating${stars[1]}.svg" alt="star">
            <img src="assets/star-rating${stars[2]}.svg" alt="star">
            <img src="assets/star-rating${stars[3]}.svg" alt="star">
            <img src="assets/star-rating${stars[4]}.svg" alt="star">
          </div>
        </header>
        <h4 class="comment-email">${review.reviewerEmail}</h4>
        <p class="comment-description">${review.comment}</p>
        <p class="comment-date">${review.date.split('T')[0]}</p>
      </div>
    `
  })
}

sortBySelect.addEventListener("change", function() {
  resetResults()
})

