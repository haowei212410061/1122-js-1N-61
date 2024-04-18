import { products_61, all_products_xx } from './p1_data_61.js';

const productContainer = document.querySelector('.products-container');
const Datalist = products_61;
console.log('products_xx', products_61);

const DisplayProducts = (products) => {
  const displayData = Datalist.map((item) => {
    return ` 
    <div class="single-product">
        <img
          src="${item.img}"
          class="single-product-img img"
          alt="high-back bench"
        />
        <footer>
          <h3 class="name">${item.category} (3)</h3>
          <span class="price">${item.price}</span>
        </footer>
      </div>
    `;
  }).join('');
  productContainer.innerHTML = displayData;
};

document.addEventListener('DOMContentLoaded', () => {
  DisplayProducts(products_61);
});
