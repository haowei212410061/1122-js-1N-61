import { _supabase } from './supabase.js';

const item = document.querySelector('.items');
const getProductsSupabase_61 = async () => {
  try {
    let { data, error } = await _supabase.from('store_f2_61').select('*');
    return data; // return the fetched data, not product_61
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const DisplayProducts = (products) => {
  let productsContent = products
    .map((product) => {
      const { name, price, local_img } = product;
      return `<div class="collection-item">
            <img class="image" src="${local_img}" />
            <div class="collection-footer">
              <span class="name">${name}</span>
              <span class="price">${price}</span>
            </div>
            <button class="custom-button">Add to Cart</button> `;
    })
    .join('');
  item.innerHTML = productsContent;
};
document.addEventListener('DOMContentLoaded', async () => {
  const products_61 = await getProductsSupabase_61(); // assign the fetched data to a variable
  DisplayProducts(products_61);
});
