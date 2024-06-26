//import { products_xx, all_products_xx } from './p1_data_61.js';

import { _supabase } from './client.supabase_61.js';

const getProductsSupabase_61 = async () => {
  try {
    let { data, error } = await _supabase.from('product_61').select('*');
    console.log('products_data', data);
    return data; // return the fetched data, not product_61
  } catch (error) {
    console.log(error);
  }
};

const productContainer = document.querySelector('.products-container');

const DisplayProducts = (products) => {
  let productsContent = products.map((product) => {
    const { id, title, price, category, img, remote_url } = product;
    return `
      <div class="single-product">
        <img
          src="${img}"
          class="single-product-img img"
          alt="${title}"
        />
        <footer>
          <h3 class="name">${title} (${id})</h3>
          <span class="price">${price}</span>
        </footer> 
      </div>
    `;
  }).join('');
  productContainer.innerHTML = productsContent;
};

document.addEventListener('DOMContentLoaded', async () => {
  const products_61 = await getProductsSupabase_61(); // assign the fetched data to a variable
  DisplayProducts(products_61);
});
