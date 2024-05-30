const url = 'https://www.course-api.com/javascript-store-products';
const productContainer = document.querySelector('.products-container');
let products_61 = [];
console.log('products_xx', products_61);

const fetchData = async(url)=>{
  try{
    const response = await fetch(url);
    const data = await response.json();
    console.log('data',data);
    return data;
  }catch(error){
    console.log(error);

  }
}

const DisplayProducts = (products) => {
  let productsContent = products.map((product) => {
    const { name,  price, image } = product.fields;
    return `
      <div class="single-product">
        <img
          src="${image[0].url}"
          class="single-product-img img"
          alt="${name}"
        />
        <footer>
          <h3 class="name">${name}</h3>
          <span class="price">${price}</span>
        </footer> 
      </div>
    `;
  }).join('');
  productContainer.innerHTML = productsContent;
};

document.addEventListener('DOMContentLoaded', async() => {
  products_61 = await fetchData(url);
  DisplayProducts(products_61);
});
